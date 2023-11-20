import { basil } from './Basil';
import { RuntimeCollectionSchema, EdgesOptions, FindByIdsOptions } from './types';
import * as mongodb from 'mongodb';
import { ObjectId, Filter, CountDocumentsOptions } from 'mongodb';
import { isObjectId } from './utils';

export class BasilCollection<Entity extends { _id: ObjectId | string }, Edges> {
  basil = basil;

  /**
   * @internal
   */
  readonly getRuntimeSchema: () => RuntimeCollectionSchema<Entity, Edges>;

  constructor(getRuntimeSchema: () => RuntimeCollectionSchema<Entity, Edges>) {
    this.getRuntimeSchema = getRuntimeSchema;
  }

  /** @internal */
  async _loadEdges<Key extends keyof Edges = never>(
    objects: Entity[],
    options: EdgesOptions<{ [key in Key]: Edges[key] }, Entity>
  ): Promise<(Entity & { [key in Key]: Edges[key] })[]> {
    const promises: Promise<unknown>[] = [];

    for (const [edgeField, edgeOptions] of Object.entries(options.edges)) {
      if (!edgeOptions) {
        throw Error(`Invalid edges field value: edges[${JSON.stringify(edgeField)}] => ${JSON.stringify(edgeOptions)}`);
      }

      const edgeInfo = this.getRuntimeSchema().edges?.[edgeField];
      if (!edgeInfo) {
        throw Error(`Invalid edges field: ${edgeField}`);
      }

      if (edgeInfo.type === 'hasMany') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collection = edgeInfo.collection as BasilCollection<{ _id: ObjectId }, object>;
        const referenceField = edgeInfo.referenceField;

        for (const object of objects) {
          const id = (object as { _id: ObjectId })._id;
          const options = edgeOptions === true ? {} : edgeOptions;
          const promise = (async () => {
            const result = await collection.findMany(
              {
                [referenceField]: id,
              },
              options
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (object as any)[edgeField] = result;
          })();
          promises.push(promise);
        }
      } else if (edgeInfo.type === 'hasOne') {
        const { collection, referenceField } = edgeInfo;
        const Target = collection as BasilCollection<{ _id: ObjectId }, object>;

        // reference values to refer other collection's `document._id` field
        const referenceValues = objects.map((object) => {
          const key = referenceField as keyof Entity;
          const value = object[key] as unknown;
          if (!isObjectId(value)) {
            throw Error(
              `Invalid reference field: reference field value is not ObjectId\n` +
                ` - collection: ${JSON.stringify(this.getRuntimeSchema().collectionName)}\n` +
                ` - edge field: ${JSON.stringify(edgeField)}\n` +
                ` - reference field: ${JSON.stringify(referenceField)}`
            );
          }
          return value;
        });

        promises.push(
          (async () => {
            const referencedDocumentMap = new Map<string, unknown>();

            // collect referenced documents
            const targets = await Target.findByIds(referenceValues);
            for (const target of targets) {
              referencedDocumentMap.set(target._id.toString(), target);
            }

            for (let i = 0; i < objects.length; i++) {
              const key = referenceValues[i].toString();
              if (referencedDocumentMap.has(key)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                objects[i][edgeField] = referencedDocumentMap.get(key);
              } else {
                throw Error(
                  `Referenced document is not found:\n` +
                    `  - collection: ${JSON.stringify(this.getRuntimeSchema().collectionName)}\n` +
                    `  - reference field: ${JSON.stringify(referenceField)}\n` +
                    `  - reference value: ${JSON.stringify(referenceValues[i].toString())}\n` +
                    `  - edge field: ${JSON.stringify(edgeField)}\n` +
                    `  - referenced collection: ${JSON.stringify(Target.getRuntimeSchema().collectionName)}\n`
                );
              }
            }
          })()
        );
      } else {
        throw Error('Invalid edge type: ' + JSON.stringify(edgeInfo));
      }
    }

    await Promise.all(promises);
    return objects as (Entity & { [key in Key]: Edges[key] })[];
  }

  /**
   * Returns a document matching the passed id value. The id value is used to match the `_id` field.
   * Returns null if the document is not found.
   *
   * @param id
   * @param options Same value as the option passed to `findOne()`
   */
  async findById<Key extends keyof Edges = never>(
    id: string | mongodb.ObjectId,
    options: Partial<EdgesOptions<{ [key in Key]: Edges[key] }, Entity>> & mongodb.FindOptions<Entity> = {}
  ): Promise<(Entity & { [key in Key]: Edges[key] }) | null> {
    const runtimeSchema = this.getRuntimeSchema();
    if (!runtimeSchema.Entity) {
      throw Error('This should not happen.');
    }

    const hasObjectId = runtimeSchema.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';
    const collection = await this.getMongoCollection();
    const _id = hasObjectId ? new mongodb.ObjectId(id) : id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await collection.findOne({ _id } as any /* FIXME */, options);

    if (!result) {
      return null;
    }

    const entity: Entity = Object.assign(new runtimeSchema.Entity(), runtimeSchema.fields.encode(result, {}));

    if (!options.edges) {
      return entity as Entity & { [key in Key]: Edges[key] }; /* FIXME */
    }

    const [loadedEntity] = await this._loadEdges([entity], { edges: options.edges ?? {} });

    return loadedEntity;
  }

  /**
   * Finds documents matching an array of ids.
   *
   * @param ids - An array of ObjectId or string
   * @param options
   * @param options.filter - Filter to query documents
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findByIds(ids: readonly (string | mongodb.ObjectId)[], options: FindByIdsOptions<Entity> = {}): Promise<Entity[]> {
    const runtimeSchema = this.getRuntimeSchema();

    const hasObjectId = runtimeSchema.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';
    const collection = await this.getMongoCollection();

    const filter = {
      ...options.filter,
      _id: { $in: ids.map((id) => (hasObjectId ? new mongodb.ObjectId(id) : id)) },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cursor = await collection.find(filter as any, options);
    const documents = await cursor.toArray();

    return documents.map((document) => {
      if (!runtimeSchema.Entity) {
        throw Error('This should not happen.');
      }
      return Object.assign(new runtimeSchema.Entity(), runtimeSchema.fields.encode(document, {}));
    });
  }

  /**
   * Performs aggregate operations on collections.
   *
   * Since the execution result will be an array of unknown type, it is recommended to use a validation library such as [zod](https://zod.dev) to verify the result.
   *
   * @param pipeline - Pipeline array to be passed to aggregate operation
   * @param options
   */
  async aggregate(pipeline: mongodb.Document[], options: mongodb.AggregateOptions = {}): Promise<unknown[]> {
    const collection = await this.getMongoCollection();
    return (await collection.aggregate(pipeline, options)).toArray();
  }

  /**
   * Fetches the first document that matches the filter.
   *
   * @param filter
   * @param options
   */
  async findOne(filter: mongodb.Filter<Entity>, options: mongodb.FindOptions<Entity> = {}): Promise<Entity | null> {
    const runtimeSchema = this.getRuntimeSchema();
    if (!runtimeSchema.Entity) {
      throw Error('This should not happen.');
    }

    const collection = await this.getMongoCollection();

    const result = await collection.findOne<Entity>(filter, options);
    if (!result) {
      return null;
    }

    return Object.assign(new runtimeSchema.Entity(), runtimeSchema.fields.encode(result, {}));
  }

  /**
   * Fetches documents that matches the filter.
   *
   * @param filter The filter used to select the document
   * @param options
   * @param options.limit Limit to returned documents count
   * @param options.skip Number of returning documents to skip
   */
  async findMany<Entity extends mongodb.Document>(filter: mongodb.Filter<Entity>, options: mongodb.FindOptions<Entity> = {}): Promise<Entity[]> {
    const runtimeSchema = this.getRuntimeSchema();
    if (!runtimeSchema.Entity) {
      throw Error('This should not happen.');
    }
    const Entity = runtimeSchema.Entity;
    const collection = await this.getMongoCollection();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cursor = await collection.find(filter as any, options);
    const documents = await cursor.toArray();

    return documents.map((document) => {
      return Object.assign(new Entity(), runtimeSchema.fields.encode(document, {}) as Entity);
    });
  }

  getMongoCollection(): Promise<mongodb.Collection<Entity>> {
    return this.basil.getCollection<Entity>(this.getRuntimeSchema().collectionName);
  }

  /**
   * Save changes to a document persisted in the collection.
   *
   * @param entity
   * @param options
   * @param options.upsert - When true, creates a new document if no document matches the query. Default value is false.
   */
  async save(entity: Entity, options: mongodb.ReplaceOptions = {}): Promise<mongodb.UpdateResult | mongodb.Document> {
    const runtimeSchema = this.getRuntimeSchema();
    const collection = await this.getMongoCollection();

    const query = { _id: entity._id };
    const result: mongodb.UpdateResult | mongodb.Document = await collection.replaceOne(
      query as any /* FIXME */, // eslint-disable-line @typescript-eslint/no-explicit-any
      runtimeSchema.fields.decode(entity) as Entity,
      options
    );

    if (result.matchedCount === 0) {
      throw Error('"save()" failed. Matched count is zero.');
    }

    return result;
  }

  /**
   * Delete the first document that matches the filter.
   *
   * @param filter
   * @param options
   */
  async deleteOne(filter: mongodb.Filter<Entity>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    const collection = await this.getMongoCollection();
    return collection.deleteOne(filter, options);
  }

  /**
   * Delete documents that matches the filter.
   *
   * @param filter
   * @param options
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteMany(filter: mongodb.Filter<Entity>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    const collection = await this.getMongoCollection();
    return collection.deleteMany(filter, options);
  }

  /**
   * Inserts a passed entity into the collection.
   *
   * @param entity
   * @param options
   */
  async insertOne(entity: Entity, options: mongodb.InsertOneOptions = {}): Promise<mongodb.InsertOneResult<Entity>> {
    const runtimeSchema = this.getRuntimeSchema();
    const collection = await this.getMongoCollection();

    const serializedDocument = runtimeSchema.fields.decode(entity) as mongodb.OptionalUnlessRequiredId<Entity>;
    return collection.insertOne(serializedDocument, options);
  }

  /**
   * Gets the number of documents matching the filter.
   *
   * @param filter The filter for the count
   * @param options Optional settings for the command
   */
  async count(filter: Filter<Entity> = {}, options: CountDocumentsOptions = {}): Promise<number> {
    const collection = await this.getMongoCollection();
    return collection.countDocuments(filter, options);
  }

  /**
   * Update multiple documents in a collection.
   *
   * @param filter The filter used to select the documents to update
   * @param update The update operations to be applied to the documents
   * @param options Optional settings for the command
   */
  async updateMany(filter: mongodb.Filter<Entity>, update: mongodb.UpdateFilter<Entity>, options: mongodb.UpdateOptions = {}): Promise<mongodb.UpdateResult | mongodb.Document> {
    const collection = await this.getMongoCollection();
    return collection.updateMany(filter, update, options);
  }

  /**
   * Update a single document in a collection.
   *
   * @param filter The filter used to select the document to update
   * @param update The update operations to be applied to the document
   * @param options Optional settings for the command
   */
  async updateOne(filter: mongodb.Filter<Entity>, update: mongodb.UpdateFilter<Entity> | Partial<Entity>, options: mongodb.UpdateOptions = {}): Promise<mongodb.UpdateResult> {
    const collection = await this.getMongoCollection();
    return collection.updateOne(filter, update, options);
  }
}

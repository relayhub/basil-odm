import { basil } from './Basil';
import { RuntimeCollectionSchema } from './types';
import { ObjectId, Filter, CountDocumentsOptions } from 'mongodb';
import { isObjectId } from './utils';
import * as mongodb from 'mongodb';

export type FindByIdsOptions<T extends mongodb.Document> = mongodb.FindOptions<T> & { filter?: mongodb.Filter<T> };

export class BasilCollection<Entity extends { _id: ObjectId | string }, Edges> {
  basil = basil;

  /**
   * @internal
   */
  readonly getRuntimeSchema: () => RuntimeCollectionSchema<Entity, Edges>;

  constructor(getRuntimeSchema: () => RuntimeCollectionSchema<Entity, Edges>) {
    this.getRuntimeSchema = getRuntimeSchema;
  }

  async loadEdges(objects: Entity[], edges: { [key in keyof Edges]: true }): Promise<(Entity & { [key in keyof Edges]: Edges[key] })[]> {
    const promises: Promise<unknown>[] = [];

    for (const [edgeField, value] of Object.entries(edges)) {
      if (!value) {
        throw Error(`Invalid edges field value: edges[${JSON.stringify(edgeField)}] => ${JSON.stringify(value)}`);
      }

      const edgeInfo = this.getRuntimeSchema().edges?.[edgeField];
      if (!edgeInfo) {
        throw Error(`Invalid edges field: ${edgeField}`);
      }

      const { entity, referenceField } = edgeInfo;
      const Target = entity as unknown as BasilCollection<{ _id: ObjectId }, object>; /* FIXME */

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
    }

    await Promise.all(promises);
    return objects as (Entity & { [key in keyof Edges]: Edges[key] })[];
  }

  /**
   * Returns a document matching the passed id value. The id value is used to match the `_id` field.
   * Returns null if the document is not found.
   *
   * @param id
   * @param options Same value as the option passed to `findOne()`
   */
  findById(id: string | mongodb.ObjectId, options: mongodb.FindOptions<Entity> = {}): Promise<Entity | null> {
    const runtimeSchema = this.getRuntimeSchema();
    const hasObjectId = runtimeSchema.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';

    return this.basil
      .useCollection(runtimeSchema, async (collection) => {
        const _id = hasObjectId ? new mongodb.ObjectId(id) : id;
        const result = await collection.findOne<Entity>({ _id: _id as ObjectId }, options);

        return result ? (runtimeSchema.fields.encode(result, {}) as Entity) : null;
      })
      .then((result) => {
        if (!runtimeSchema.Entity) {
          throw Error('This should not happen.');
        }

        return result ? Object.assign(new runtimeSchema.Entity(), result) : result;
      });
  }

  /**
   * Finds documents matching an array of ids.
   *
   * @param ids - An array of ObjectId or string
   * @param options
   * @param options.filter - Filter to query documents
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findByIds(ids: readonly (string | mongodb.ObjectId)[], options: FindByIdsOptions<Entity> = {}): Promise<Entity[]> {
    const runtimeSchema = this.getRuntimeSchema();
    const hasObjectId = runtimeSchema.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';

    const filter = {
      ...options.filter,
      _id: { $in: ids.map((id) => (hasObjectId ? new mongodb.ObjectId(id) : id)) },
    };

    return basil.useCollection(runtimeSchema, async (collection) => {
      const cursor = await collection.find(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
      const documents = (await cursor.toArray()) as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

      return documents
        .map((document) => {
          return runtimeSchema.fields.encode(document as any, {}) as Entity; // eslint-disable-line @typescript-eslint/no-explicit-any
        })
        .map((document) => {
          if (!runtimeSchema.Entity) {
            throw Error('This should not happen.');
          }

          return Object.assign(new runtimeSchema.Entity(), document);
        });
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
  aggregate(pipeline: mongodb.Document[], options: mongodb.AggregateOptions = {}): Promise<unknown[]> {
    return basil.useCollection(this.getRuntimeSchema(), async (collection) => {
      return (await collection.aggregate(pipeline, options)).toArray();
    });
  }

  /**
   * Fetches the first document that matches the filter.
   *
   * @param filter
   * @param options
   */
  findOne(filter: mongodb.Filter<Entity>, options: mongodb.FindOptions<Entity> = {}): Promise<Entity | null> {
    const runtimeSchema = this.getRuntimeSchema();

    return basil
      .useCollection<Entity, Entity | null>(runtimeSchema, async (collection) => {
        const result = await collection.findOne<Entity>(filter, options);
        return result ? (runtimeSchema.fields.encode(result, {}) as Entity) : null;
      })
      .then((result) => {
        if (!runtimeSchema.Entity) {
          throw Error('This should not happen.');
        }

        return result ? Object.assign(new runtimeSchema.Entity(), result) : result;
      });
  }

  /**
   * Fetches documents that matches the filter.
   *
   * @param filter The filter used to select the document
   * @param options
   * @param options.limit Limit to returned documents count
   * @param options.skip Number of returning documents to skip
   */
  findMany<Entity extends mongodb.Document>(filter: mongodb.Filter<Entity>, options: mongodb.FindOptions<Entity> = {}): Promise<Entity[]> {
    const runtimeSchema = this.getRuntimeSchema();
    return this.basil.useCollection(runtimeSchema, async (collection) => {
      const cursor = await collection.find(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
      const documents = await cursor.toArray();

      return documents.map((document) => {
        if (!runtimeSchema.Entity) {
          throw Error('This should not happen.');
        }

        return Object.assign(new runtimeSchema.Entity(), runtimeSchema.fields.encode(document, {}) as Entity);
      });
    });
  }

  /**
   * Save changes to a document persisted in the collection.
   *
   * @param entity
   * @param options
   * @param options.upsert - When true, creates a new document if no document matches the query. Default value is false.
   */
  save(entity: Entity, options: mongodb.ReplaceOptions = {}): Promise<mongodb.UpdateResult | mongodb.Document> {
    const runtimeSchema = this.getRuntimeSchema();

    return this.basil.useCollection<Entity, mongodb.UpdateResult | mongodb.Document>(runtimeSchema, async (collection) => {
      const payload = {
        query: { _id: entity._id },
        entity,
      };
      const result: mongodb.UpdateResult | mongodb.Document = await collection.replaceOne(payload.query as any, runtimeSchema.fields.decode(payload.entity) as Entity, options); // eslint-disable-line @typescript-eslint/no-explicit-any

      if (result.matchedCount === 0) {
        throw Error('"save()" failed. Matched count is zero.');
      }

      return result;
    });
  }

  /**
   * Delete the first document that matches the filter.
   *
   * @param filter
   * @param options
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteOne<Entity extends { [key: string]: any }>(filter: mongodb.Filter<Entity>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.deleteOne(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  }

  /**
   * Delete documents that matches the filter.
   *
   * @param filter
   * @param options
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMany(filter: mongodb.Filter<Entity>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.deleteMany(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  }

  /**
   * Inserts a passed entity into the collection.
   *
   * @param entity
   * @param options
   */
  insertOne(entity: Entity, options: mongodb.InsertOneOptions = {}): Promise<mongodb.InsertOneResult<mongodb.WithId<Entity>>> {
    const target = this.getRuntimeSchema();

    return this.basil.useCollection(target, (collection) => {
      const serializedDocument = target.fields.decode(entity) as mongodb.OptionalId<Entity>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return collection.insertOne(serializedDocument as any, { ...options });
    });
  }

  /**
   * Gets the number of documents matching the filter.
   *
   * @param filter The filter for the count
   * @param options Optional settings for the command
   */
  count(filter: Filter<Entity> = {}, options: CountDocumentsOptions = {}): Promise<number> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.countDocuments(filter, options);
    });
  }

  /**
   * Update multiple documents in a collection.
   *
   * @param filter The filter used to select the documents to update
   * @param update The update operations to be applied to the documents
   * @param options Optional settings for the command
   */
  updateMany(filter: mongodb.Filter<Entity>, update: mongodb.UpdateFilter<Entity>, options: mongodb.UpdateOptions = {}): Promise<mongodb.UpdateResult | mongodb.Document> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.updateMany(filter as any, update as any /* FIXME */, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  }

  /**
   * Update a single document in a collection.
   *
   * @param filter The filter used to select the document to update
   * @param update The update operations to be applied to the document
   * @param options Optional settings for the command
   */
  updateOne(filter: mongodb.Filter<Entity>, update: mongodb.UpdateFilter<Entity> | Partial<Entity>, options: mongodb.UpdateOptions = {}): Promise<mongodb.UpdateResult> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.updateOne(filter as any, update, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  }
}

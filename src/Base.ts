import { basil } from './Basil';
import { createFieldsSchema } from './schema/FieldsSchema';
import { RuntimeCollectionSchema } from './types';
import * as mongodb from 'mongodb';
import { ObjectId, CountDocumentsOptions, Filter } from 'mongodb';

/**
 * @internal
 */
export type BaseClass<T> = typeof Base & {
  new (): T;
  getRuntimeSchema(): RuntimeCollectionSchema<T>;
};

export type FindByIdsOptions<T extends mongodb.Document> = mongodb.FindOptions<T> & { filter?: mongodb.Filter<T> };

export class Base {
  static basil = basil;

  /**
   * @internal
   */
  static getRuntimeSchema(): RuntimeCollectionSchema<unknown> {
    return {
      fields: createFieldsSchema({}),
      indexes: [],
      collectionName: '',
    };
  }

  /**
   * Returns a document matching the passed id value. The id value is used to match the `_id` field.
   * Returns null if the document is not found.
   *
   * @param id
   * @param options Same value as the option passed to `findOne()`
   */
  static findById<T extends { _id: ObjectId | string }>(this: BaseClass<T>, id: string | mongodb.ObjectId, options: mongodb.FindOptions<T> = {}): Promise<T | null> {
    const target = this.getRuntimeSchema();
    const hasObjectId = target.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';

    return this.basil
      .useCollection(target, async (collection) => {
        const _id = hasObjectId ? new mongodb.ObjectId(id) : id;
        const result = await collection.findOne<T>({ _id: _id as ObjectId }, options);

        return result ? (target.fields.encode(result, {}) as T) : null;
      })
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
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
  static findByIds<T extends { [key: string]: any }>(this: BaseClass<T>, ids: readonly (string | mongodb.ObjectId)[], options: FindByIdsOptions<T> = {}): Promise<T[]> {
    const target = this.getRuntimeSchema();
    const hasObjectId = target.fields.getSchemaAST().props['_id']?.node.kind === 'objectId';

    const filter = {
      ...options.filter,
      _id: { $in: ids.map((id) => (hasObjectId ? new mongodb.ObjectId(id) : id)) },
    };

    return basil.useCollection(target, async (collection) => {
      const cursor = await collection.find(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
      const documents = (await cursor.toArray()) as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

      return documents
        .map((document) => {
          return target.fields.encode(document as any, {}) as T; // eslint-disable-line @typescript-eslint/no-explicit-any
        })
        .map((document) => Object.assign(new this(), document));
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
  static aggregate<T extends mongodb.Document>(this: BaseClass<T>, pipeline: mongodb.Document[], options: mongodb.AggregateOptions = {}): Promise<unknown[]> {
    const target = this.getRuntimeSchema();
    return basil.useCollection(target, async (collection) => {
      return (await collection.aggregate(pipeline, options)).toArray();
    });
  }

  /**
   * Fetches the first document that matches the filter.
   *
   * @param filter
   * @param options
   */
  static findOne<T extends mongodb.Document>(this: BaseClass<T>, filter: mongodb.Filter<T>, options: mongodb.FindOptions<T> = {}): Promise<T | null> {
    const target = this.getRuntimeSchema();

    return basil
      .useCollection(target, async (collection) => {
        const result = await collection.findOne<T>(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
        return result ? (target.fields.encode(result, {}) as T) : null;
      })
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
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
  static findMany<T extends mongodb.Document>(this: BaseClass<T>, filter: mongodb.Filter<T>, options: mongodb.FindOptions<T> = {}): Promise<T[]> {
    const target = this.getRuntimeSchema();
    return this.basil.useCollection(target, async (collection) => {
      const cursor = await collection.find(filter as any, options); // eslint-disable-line @typescript-eslint/no-explicit-any
      const documents = await cursor.toArray();

      return documents.map((document) => {
        return Object.assign(new this(), target.fields.encode(document, {}) as T);
      });
    });
  }

  /**
   * Save changes to a document persisted in the collection.
   *
   * @param filter The filter used to select the document to save
   * @param options
   * @param options.upsert - When true, creates a new document if no document matches the query. Default value is false.
   */
  static save<T extends { _id: mongodb.ObjectId | string }>(this: BaseClass<T>, entity: T, options: mongodb.ReplaceOptions = {}): Promise<mongodb.UpdateResult | mongodb.Document> {
    const target = this.getRuntimeSchema();

    return this.basil.useCollection(target, async (collection) => {
      const payload = {
        query: { _id: entity._id },
        entity,
      };
      const result: mongodb.UpdateResult | mongodb.Document = await collection.replaceOne(payload.query as any, target.fields.decode(payload.entity) as T, options); // eslint-disable-line @typescript-eslint/no-explicit-any

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
  static deleteOne<T extends { [key: string]: any }>(this: BaseClass<T>, filter: mongodb.Filter<T>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
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
  static deleteMany<T extends { [key: string]: any }>(this: BaseClass<T>, filter: mongodb.Filter<T>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static insertOne<T extends { [key: string]: any }>(this: BaseClass<T>, entity: T, options: mongodb.InsertOneOptions = {}): Promise<mongodb.InsertOneResult<mongodb.WithId<T>>> {
    const target = this.getRuntimeSchema();

    return this.basil.useCollection(target, (collection) => {
      const serializedDocument = target.fields.decode(entity) as mongodb.OptionalId<T>;
      return collection.insertOne(serializedDocument, { ...options });
    });
  }

  /**
   * Gets the number of documents matching the filter.
   *
   * @param filter The filter for the count
   * @param options Optional settings for the command
   */
  static count<T>(this: BaseClass<T>, filter: Filter<T> = {}, options: CountDocumentsOptions = {}): Promise<number> {
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
  static updateMany<T>(
    this: BaseClass<T>,
    filter: mongodb.Filter<T>,
    update: mongodb.UpdateFilter<T>,
    options: mongodb.UpdateOptions = {}
  ): Promise<mongodb.UpdateResult | mongodb.Document> {
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
  static updateOne<T>(
    this: BaseClass<T>,
    filter: mongodb.Filter<T>,
    update: mongodb.UpdateFilter<T> | Partial<T>,
    options: mongodb.UpdateOptions = {}
  ): Promise<mongodb.UpdateResult> {
    return this.basil.useCollection(this.getRuntimeSchema(), (collection) => {
      return collection.updateOne(filter as any, update, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  }
}

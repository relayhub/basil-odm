import { Basil } from './Basil';
import { createFieldsSchema } from './schema/FieldsSchema';
import { CountParams, TargetCollection } from './types';
import * as mongodb from 'mongodb';

export interface EntitySource<T> {
  new (): T;
  getCollection(): TargetCollection<T>;
  getBasil(): Basil;
}

export type FindByIdsOptions<T extends mongodb.Document> = mongodb.FindOptions<T> & { filter?: mongodb.Filter<T> };

export class Base {
  static getBasil() {
    return Basil.getInstance();
  }

  static getCollection(): TargetCollection<any> {
    return {
      schema: createFieldsSchema({}),
      indexes: [],
      collectionName: '',
    };
  }

  static findById<T extends { [key: string]: any }>(this: EntitySource<T>, id: string | mongodb.ObjectId, options: mongodb.FindOptions<T> = {}): Promise<T | null> {
    const target = this.getCollection();
    const hasObjectId = target.schema.getSchemaAST().props['_id']?.node.kind === 'objectId';

    return this.getBasil()
      .useCollection(target, async (collection) => {
        const _id = hasObjectId ? new mongodb.ObjectId(id) : id;
        const result = await collection.findOne<T>({ _id }, options);

        return result ? (target.schema.encode(result, {}) as T) : null;
      })
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
      });
  }

  static findByIds<T extends { [key: string]: any }>(this: EntitySource<T>, ids: readonly (string | mongodb.ObjectId)[], options: FindByIdsOptions<T> = {}): Promise<T[]> {
    const target = this.getCollection();
    const hasObjectId = target.schema.getSchemaAST().props['_id']?.node.kind === 'objectId';

    const filter = {
      ...options.filter,
      _id: { $in: ids.map((id) => (hasObjectId ? new mongodb.ObjectId(id) : id)) },
    };

    return this.getBasil().useCollection(target, async (collection) => {
      const cursor = await collection.find(filter, options);
      const documents = (await cursor.toArray()) as any[];

      return documents
        .map((document) => {
          return target.schema.encode(document as any, {}) as T;
        })
        .map((document) => Object.assign(new this(), document));
    });
  }

  static aggregate<T extends mongodb.Document>(this: EntitySource<T>, pipeline: mongodb.Document[], options: mongodb.AggregateOptions = {}): Promise<unknown[]> {
    const target = this.getCollection();
    return this.getBasil().useCollection(target, async (collection) => {
      return (await collection.aggregate(pipeline, options)).toArray();
    });
  }

  static findOne<T extends mongodb.Document>(this: EntitySource<T>, filter: mongodb.Filter<T>, options: mongodb.FindOptions<T> = {}): Promise<T | null> {
    const target = this.getCollection();

    return this.getBasil()
      .useCollection(target, async (collection) => {
        const result = await collection.findOne<T>(filter, options);
        return result ? (target.schema.encode(result, {}) as T) : null;
      })
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
      });
  }

  static findMany<T extends mongodb.Document>(this: EntitySource<T>, filter: mongodb.Filter<T>, options: mongodb.FindOptions<T> = {}): Promise<T[]> {
    const target = this.getCollection();
    return this.getBasil().useCollection(target, async (collection) => {
      const cursor = await collection.find(filter, options);
      const documents = await cursor.toArray();

      return documents.map((document) => {
        return Object.assign(new this(), target.schema.encode(document, {}) as T);
      });
    });
  }

  static save<T extends { _id: mongodb.ObjectId | string }>(
    this: EntitySource<T>,
    entity: T,
    options: mongodb.ReplaceOptions = {}
  ): Promise<mongodb.UpdateResult | mongodb.Document> {
    const target = this.getCollection();

    return this.getBasil().useCollection(target, async (collection) => {
      const payload = {
        query: { _id: entity._id },
        entity,
      };
      const result: mongodb.UpdateResult | mongodb.Document = await collection.replaceOne(payload.query as mongodb.Filter<T>, target.schema.decode(payload.entity) as T, options);

      if (result.matchedCount === 0) {
        throw Error('"save()" failed. Matched count is zero.');
      }

      return result;
    });
  }

  static deleteOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: mongodb.Filter<T>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.deleteOne(filter, options);
    });
  }

  static deleteMany<T extends { [key: string]: any }>(this: EntitySource<T>, filter: mongodb.Filter<T>, options: mongodb.DeleteOptions = {}): Promise<mongodb.DeleteResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.deleteMany(filter, options);
    });
  }

  static insertOne<T extends { [key: string]: any }>(
    this: EntitySource<T>,
    entity: T,
    options: mongodb.InsertOneOptions = {}
  ): Promise<mongodb.InsertOneResult<mongodb.WithId<T>>> {
    const target = this.getCollection();

    return this.getBasil().useCollection(target, (collection) => {
      const serializedDocument = target.schema.decode(entity) as mongodb.OptionalId<T>;
      return collection.insertOne(serializedDocument, { ...options });
    });
  }

  static count<T extends { [key: string]: any }>(this: EntitySource<T>, params: CountParams<T> = {}): Promise<number> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.countDocuments(params?.filter ?? {}, params?.options ?? {});
    });
  }

  static updateMany<T>(
    this: EntitySource<T>,
    filter: mongodb.Filter<T>,
    update: mongodb.UpdateFilter<T>,
    options: mongodb.UpdateOptions = {}
  ): Promise<mongodb.UpdateResult | mongodb.Document> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.updateMany(filter, update as any /* FIXME */, options);
    });
  }

  static updateOne<T>(
    this: EntitySource<T>,
    filter: mongodb.Filter<T>,
    update: mongodb.UpdateFilter<T> | Partial<T>,
    options: mongodb.UpdateOptions = {}
  ): Promise<mongodb.UpdateResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.updateOne(filter, update, options);
    });
  }
}

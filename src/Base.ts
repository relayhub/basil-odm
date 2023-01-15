import { Basil } from './Basil';
import { createFieldsSchema } from './schema/FieldsSchema';
import { CountParams, TargetCollection, UpdateQuery } from './types';
import {
  ObjectId,
  WithId,
  InsertOneOptions,
  InsertOneResult,
  FindOptions,
  DeleteOptions,
  DeleteResult,
  Filter,
  ReplaceOptions,
  UpdateResult,
  Document,
  UpdateOptions,
  OptionalId,
  UpdateFilter,
} from 'mongodb';

export interface EntitySource<T> {
  new (): T;
  getCollection(): TargetCollection<T>;
  getBasil(): Basil;
}

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

  static findById<T extends { [key: string]: any }>(this: EntitySource<T>, id: string | ObjectId, options: FindOptions = {}): Promise<T | null> {
    const target = this.getCollection();

    return this.getBasil()
      .useCollection(target, async (collection) => {
        const result = await collection.findOne<T>({ _id: id }, options);
        return result ? (target.schema.encode(result, {}) as T) : null;
      })
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
      });
  }

  static findByIds<T extends { [key: string]: any }>(this: EntitySource<T>, ids: readonly (string | ObjectId)[], options: FindOptions = {}): Promise<T[]> {
    const filter = {
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    };

    const target = this.getCollection();
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

  static findOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options: FindOptions = {}): Promise<T | null> {
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

  static findMany<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options: FindOptions = {}): Promise<T[]> {
    const target = this.getCollection();
    return this.getBasil().useCollection(target, async (collection) => {
      const cursor = await collection.find(filter, options);
      const documents = await cursor.toArray();

      return documents.map((document) => {
        return Object.assign(new this(), target.schema.encode(document, {}) as T);
      });
    });
  }

  static save<T extends { _id: any }>(this: EntitySource<T>, entity: T, options: ReplaceOptions = {}): Promise<UpdateResult | Document> {
    const target = this.getCollection();

    return this.getBasil().useCollection(target, async (collection) => {
      const payload = {
        query: { _id: entity._id },
        entity,
      };
      const result: UpdateResult | Document = await collection.replaceOne(payload.query as Filter<T>, target.schema.decode(payload.entity) as T, options);

      if (result.matchedCount === 0) {
        throw Error('"save()" failed. Matched count is zero.');
      }

      return result;
    });
  }

  static deleteOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options: DeleteOptions = {}): Promise<DeleteResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.deleteOne(filter, options);
    });
  }

  static deleteMany<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options: DeleteOptions = {}): Promise<DeleteResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.deleteMany(filter, options);
    });
  }

  static insertOne<T extends { [key: string]: any }>(this: EntitySource<T>, entity: T, options: InsertOneOptions = {}): Promise<InsertOneResult<WithId<T>>> {
    const target = this.getCollection();

    return this.getBasil().useCollection(target, (collection) => {
      const serializedDocument = target.schema.decode(entity) as OptionalId<T>;
      return collection.insertOne(serializedDocument, { ...options });
    });
  }

  static count<T extends { [key: string]: any }>(this: EntitySource<T>, params: CountParams<T> = {}): Promise<number> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.countDocuments(params?.filter ?? {}, params?.options ?? {});
    });
  }

  static updateMany<T>(this: EntitySource<T>, filter: Filter<T>, update: UpdateFilter<T>, options: UpdateOptions = {}): Promise<UpdateResult | Document> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.updateMany(filter, update as any /* FIXME */, options);
    });
  }

  static updateOne<T>(this: EntitySource<T>, filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options: UpdateOptions = {}): Promise<UpdateResult> {
    return this.getBasil().useCollection(this.getCollection(), (collection) => {
      return collection.updateOne(filter, update, options);
    });
  }
}

import { Basil } from './Basil';
import { createFieldsSchema } from './schema/FieldsSchema';
import { CountOptions, FindByIdOptions, TargetCollection, UpdateQuery } from './types';
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
} from 'mongodb';

export interface EntitySource<T extends { [key: string]: any }> {
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

  static findById<T extends { [key: string]: any }>(this: EntitySource<T>, id: string | ObjectId, options?: FindByIdOptions<T>): Promise<T | null> {
    return this.getBasil()
      .findOne(this.getCollection(), { ...(options?.filter ?? {}), _id: new ObjectId(id) } as any)
      .then((result) => (result ? Object.assign(new this(), result) : result));
  }

  static findByIds<T extends { [key: string]: any }>(this: EntitySource<T>, ids: readonly (string | ObjectId)[], options?: FindByIdOptions<T>): Promise<T[]> {
    const filter = {
      _id: { $in: ids.map((id) => new ObjectId(id)) },
      ...(options?.filter ?? {}),
    };

    return this.getBasil()
      .findMany(this.getCollection(), filter as any)
      .then((result) => result.map((doc) => Object.assign(new this(), doc)));
  }

  static findOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options?: FindOptions<T>): Promise<T | null> {
    return this.getBasil()
      .findOne(this.getCollection(), filter, options)
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
      });
  }

  static findMany<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options: FindOptions = {}): Promise<T[]> {
    return this.getBasil()
      .findMany(this.getCollection(), filter, options)
      .then((result) => {
        return result.map((entity) => Object.assign(new this(), entity));
      });
  }

  static save<T extends { _id: any }>(this: EntitySource<T>, entity: T, options?: ReplaceOptions): Promise<UpdateResult | Document> {
    return this.getBasil().save(this.getCollection(), entity, options);
  }

  static deleteOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
    return this.getBasil().deleteOne(this.getCollection(), filter, options);
  }

  static insertOne<T extends { [key: string]: any }>(this: EntitySource<T>, entity: T, options: InsertOneOptions = {}): Promise<InsertOneResult<WithId<T>>> {
    return this.getBasil().insertOne(this.getCollection(), entity, options);
  }

  static count<T extends { [key: string]: any }>(this: EntitySource<T>, options?: CountOptions<T>): Promise<number> {
    return this.getBasil().count(this.getCollection(), options);
  }

  static updateMany<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, update: UpdateQuery, options?: UpdateOptions): Promise<UpdateResult | Document> {
    return this.getBasil().updateMany(this.getCollection(), filter, update, options);
  }

  static updateOne<T extends { [key: string]: any }>(this: EntitySource<T>, filter: Filter<T>, update: UpdateQuery, options?: UpdateOptions): Promise<UpdateResult> {
    return this.getBasil().updateOne(this.getCollection(), filter, update, options);
  }
}

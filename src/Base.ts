import {Basil} from './Basil';
import {createFieldsSchema} from './schema/FieldsSchema';
import {CountOptions, FindByIdOptions, FindManyOptions, TargetCollection, UpdateQuery} from './types';
import {
  CollectionInsertOneOptions,
  CommonOptions,
  DeleteWriteOpResultObject,
  FilterQuery,
  FindOneOptions,
  InsertOneWriteOpResult,
  ObjectId,
  ReplaceOneOptions,
  ReplaceWriteOpResult,
  UpdateManyOptions,
  UpdateOneOptions,
  UpdateWriteOpResult,
  WithId,
} from 'mongodb';

export interface EntitySource<T extends {[key: string]: any}> {
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

  static findById<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    id: string | ObjectId,
    options?: FindByIdOptions<T>
  ): Promise<T | null> {
    return this.getBasil()
      .findOne(this.getCollection(), {...(options?.filter ?? {}), _id: new ObjectId(id)} as any)
      .then((result) => (result ? Object.assign(new this(), result) : result));
  }

  static findByIds<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    ids: readonly (string | ObjectId)[],
    options?: FindByIdOptions<T>
  ): Promise<T[]> {
    const filter = {
      _id: {$in: ids.map((id) => new ObjectId(id))},
      ...(options?.filter ?? {}),
    };

    return this.getBasil()
      .findMany(this.getCollection(), filter as any)
      .then((result) => result.map((doc) => Object.assign(new this(), doc)));
  }

  static findOne<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    filter: FilterQuery<T>,
    options?: FindOneOptions<T>
  ): Promise<T | null> {
    return this.getBasil()
      .findOne(this.getCollection(), filter, options)
      .then((result) => {
        return result ? Object.assign(new this(), result) : result;
      });
  }

  static findMany<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    filter: FilterQuery<T>,
    options?: FindManyOptions
  ): Promise<T[]> {
    return this.getBasil()
      .findMany(this.getCollection(), filter, options)
      .then((result) => {
        return result.map((entity) => Object.assign(new this(), entity));
      });
  }

  static save<T extends {_id: any}>(
    this: EntitySource<T>,
    entity: T,
    options?: ReplaceOneOptions
  ): Promise<ReplaceWriteOpResult> {
    return this.getBasil().save(this.getCollection(), entity, options);
  }

  static deleteOne<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    filter: FilterQuery<T>,
    options?: CommonOptions
  ): Promise<DeleteWriteOpResultObject> {
    return this.getBasil().deleteOne(this.getCollection(), filter, options);
  }

  static insertOne<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    entity: T,
    options?: CollectionInsertOneOptions
  ): Promise<InsertOneWriteOpResult<WithId<T>>> {
    return this.getBasil().insertOne(this.getCollection(), entity, options);
  }

  static count<T extends {[key: string]: any}>(this: EntitySource<T>, options?: CountOptions<T>): Promise<number> {
    return this.getBasil().count(this.getCollection(), options);
  }

  static updateMany<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery,
    options?: UpdateManyOptions
  ): Promise<UpdateWriteOpResult> {
    return this.getBasil().updateMany(this.getCollection(), filter, update, options);
  }

  static updateOne<T extends {[key: string]: any}>(
    this: EntitySource<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery,
    options?: UpdateOneOptions
  ): Promise<UpdateWriteOpResult> {
    return this.getBasil().updateOne(this.getCollection(), filter, update, options);
  }
}

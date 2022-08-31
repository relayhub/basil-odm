import { Db, FilterQuery, FindOneOptions, MongoClientOptions, UpdateManyOptions, UpdateOneOptions } from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';

export interface CollectionSettings {
  source?: string;
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
}

export interface BasilSettings {
  connectionUri: string;
  databaseName: string;
  clientOptions: MongoClientOptions;
}

export interface UpdateQuery {
  [key: string]: any;
}

export type Options = {
  database?: Db;
};

export type IndexFields = { [key: string]: -1 | 1 };

export type IndexOptions = {
  unique?: boolean;
  sparse?: boolean;
};

export type Index = {
  fields: IndexFields;
  options?: IndexOptions;
};

export type FindManyOptions = {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: number };
};

export interface UpdateManyParams<E> {
  filter: FilterQuery<E>;
  update: UpdateQuery;
  options?: UpdateManyOptions;
}

export interface UpdateOneParams<E> {
  filter: FilterQuery<E>;
  update: UpdateQuery;
  options?: UpdateOneOptions;
}

export interface FindManyParams<E> {
  filter?: FilterQuery<E>;
  options?: FindManyOptions;
}

export interface FindOneParams<E> {
  filter: FilterQuery<E>;
  options?: FindOneOptions<E>;
}

export interface FindByIdOptions<E> {
  filter: FilterQuery<E>;
}

export interface CountOptions<E> {
  filter: FilterQuery<E>;
}

export type CollectionDef = {
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  entityName: string | null;
};

export type TargetCollection<T extends { [key: string]: any }> = {
  _type?: T;
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
};

import { Db, MongoClientOptions, Filter, FindOptions, UpdateOptions, CountDocumentsOptions } from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';

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
  filter: Filter<E>;
  update: UpdateQuery;
  options?: UpdateOptions;
}

export interface UpdateOneParams<E> {
  filter: Filter<E>;
  update: UpdateQuery;
  options?: UpdateOptions;
}

export interface FindManyParams<E> {
  filter?: Filter<E>;
  options?: FindManyOptions;
}

export interface FindOneParams<E> {
  filter: Filter<E>;
  options?: FindOptions;
}

export interface FindByIdOptions<E> {
  filter: Filter<E>;
}

export interface CountOptions<E> {
  filter: Filter<E>;
  countDocumentOption?: CountDocumentsOptions;
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

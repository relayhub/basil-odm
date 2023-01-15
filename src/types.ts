import { Db, MongoClientOptions, Filter, CountDocumentsOptions } from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';

export interface BasilSettings {
  connectionUri: string;
  databaseName: string;
  clientOptions: MongoClientOptions;
}

export interface UpdateQuery {
  [key: string]: any;
}

export type IndexFields = { [key: string]: -1 | 1 };

export type IndexOptions = {
  unique?: boolean;
  sparse?: boolean;
};

export type Index = {
  fields: IndexFields;
  options?: IndexOptions;
};

export interface CountParams<E> {
  filter?: Filter<E>;
  options?: CountDocumentsOptions;
}

export type CollectionDef = {
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  entityName: string | null;
};

export type TargetCollection<T> = {
  _type?: T;
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
};

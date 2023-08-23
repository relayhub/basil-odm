import type { MongoClientOptions, Filter, CountDocumentsOptions, CreateIndexesOptions } from 'mongodb';
import * as mongodb from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';

export interface BasilSettings {
  connectionUri: string;
  databaseName: string;
  clientOptions: MongoClientOptions;
}

export type IndexFields = { [key: string]: -1 | 1 };

export type IndexOptions = {
  unique?: boolean;
  sparse?: boolean;
} & CreateIndexesOptions;

export type Index = {
  fields: IndexFields;
  options?: IndexOptions;
};

export interface CountParams<E> {
  filter?: Filter<E>;
  options?: CountDocumentsOptions;
}

export type CollectionOptions = Omit<mongodb.CreateCollectionOptions & Record<string, unknown>, 'validator'>;

export type CollectionDef = {
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  entityName: string | null;
  options?: CollectionOptions;
};

export type EntityMeta<T> = {
  _type?: T;
  schema: FieldsSchema;
  collectionName: string;
  indexes: Index[];
};

export type DefinedSchema = Record<string, CollectionDef> | CollectionDef[];

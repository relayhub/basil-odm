import type { MongoClientOptions, CreateIndexesOptions } from 'mongodb';
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

export type CollectionOptions = Omit<mongodb.CreateCollectionOptions & Record<string, unknown>, 'validator'>;

export type CollectionDef = {
  fields: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  entityName: string | null;
  options?: CollectionOptions;
};

export type RuntimeCollectionSchema<T> = {
  _type?: T;
  fields: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  options?: CollectionOptions;
};

export type DefinedSchema = Record<string, CollectionDef> | CollectionDef[];

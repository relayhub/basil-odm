import type { MongoClientOptions, CreateIndexesOptions } from 'mongodb';
import * as mongodb from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';
import { Edge } from './schema/edgeTypes';

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
  entityName: string;
  options?: CollectionOptions;
  edges?: Record<string, Edge>;
};

export type RuntimeCollectionSchema<Entity, Edges = unknown> = {
  _type?: Entity;
  _edgesType?: Edges;
  fields: FieldsSchema;
  collectionName: string;
  indexes: Index[];
  options?: CollectionOptions;
  edges?: Record<string, RuntimeEdge>;
};

export type RuntimeEdge = RuntimeHasOne;

export type RuntimeHasOne = {
  type: 'hasOne';
  entity: unknown;
  referenceField: string;
};

export type DefinedSchema = Record<string, CollectionDef> | CollectionDef[];

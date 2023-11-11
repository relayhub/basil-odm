import type { MongoClientOptions, CreateIndexesOptions } from 'mongodb';
import * as mongodb from 'mongodb';
import { FieldsSchema } from './schema/FieldsSchema';
import { Edge } from './schema/edgeTypes';
import type { BaseClass } from './Base';
import type { BasilCollection } from './BasilCollection';

export interface ResolvedConfig {
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

export const collectionDefSymbol = Symbol.for('collectionDef');

export type CollectionDef = {
  [collectionDefSymbol]: true;
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
  Entity?: new () => Entity;
  indexes: Index[];
  options?: CollectionOptions;
  edges?: Record<string, RuntimeEdge>;
};

export type RuntimeEdge = RuntimeHasOne;

export type RuntimeHasOne = {
  type: 'hasOne';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: BaseClass<unknown> | BasilCollection<any, unknown>;
  referenceField: string;
};

export type DefinedSchema = Record<string, CollectionDef> | CollectionDef[];

import type { MongoClientOptions, CreateIndexesOptions } from 'mongodb';
import type * as mongodb from 'mongodb';
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

export type CollectionOptions = Omit<
  mongodb.CreateCollectionOptions & Record<string, unknown>,
  'validator'
>;

export const collectionDefSymbol = Symbol.for('collectionDef');

export type CollectionDef = {
  [collectionDefSymbol]: true;
  fields: FieldsSchema<unknown>;
  collectionName: string;
  indexes: Index[];
  entityName: string;
  options?: CollectionOptions;
  edges?: Record<string, Edge>;
};

export type RuntimeCollectionSchema<Entity, Edges = unknown> = {
  _type?: Entity;
  _edgesType?: Edges;
  fields: FieldsSchema<unknown>;
  collectionName: string;
  Entity?: new () => Entity;
  indexes: Index[];
  options?: CollectionOptions;
  edges?: Record<string, RuntimeEdge>;
};

export type RuntimeEdge = RuntimeHasOne | RuntimeHasMany;

export type RuntimeHasOne = {
  type: 'hasOne';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: BaseClass<unknown> | BasilCollection<any, unknown>;
  referenceField: string;
};

export type RuntimeHasMany = {
  type: 'hasMany';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: BaseClass<unknown> | BasilCollection<any, unknown>;
  referenceField: string;
};

export type DefinedSchema = Record<string, CollectionDef> | CollectionDef[];

export type FindByIdsOptions<T extends mongodb.Document> = mongodb.FindOptions<T> & {
  filter?: mongodb.Filter<T>;
};

export type EdgeOptions<Entity> =
  | true
  | {
      order?: mongodb.Sort;
      skip?: number;
      filter?: mongodb.Filter<Entity>;
      limit?: number;
    };

export type EdgesOptions<SubsetEdges, Entity> = {
  edges: {
    [K in keyof SubsetEdges]: EdgeOptions<Entity>;
  };
};

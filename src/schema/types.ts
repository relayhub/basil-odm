import { SchemaNode } from './astTypes';
import { getSchemaFragmentSymbol, optionalPropertyFlag, schemaFragmentFrag } from './symbols';

export type Entity = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Document = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface SchemaFragment {
  [schemaFragmentFrag]: true;

  buildASTNode(): SchemaNode;

  [optionalPropertyFlag]?: boolean;
}

export interface SchemaFragmentAggregate {
  [getSchemaFragmentSymbol](): SchemaFragment;
}

export interface ObjectSchemaSource {
  [key: string]: SchemaLike;
}

export type ArraySchemaSource = [SchemaLike];

export type SchemaLike = SchemaFragmentAggregate | SchemaFragment | ObjectSchemaSource | ArraySchemaSource;

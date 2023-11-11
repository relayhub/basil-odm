import { SchemaNode } from './astTypes';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

export type Entity = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Document = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface SchemaFragment {
  [schemaFragmentFrag]: true;

  buildASTNode(): SchemaNode;

  [optionalPropertyFlag]?: boolean;
}

export interface ObjectSchemaSource {
  [key: string]: SchemaFragment;
}

export type SchemaLike = SchemaFragment;

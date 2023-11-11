import { SchemaNode } from './astTypes';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

export type Entity = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Document = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface SchemaFragment<T> {
  _type?: T;
  [schemaFragmentFrag]: true;

  buildASTNode(): SchemaNode;

  [optionalPropertyFlag]?: boolean;
}

export type ObjectSchemaSource<T> = {
  [P in keyof T]: SchemaFragment<T[P]>;
};

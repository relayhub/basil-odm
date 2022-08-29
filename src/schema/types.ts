import { SchemaNode } from "./astTypes";
import {
  getSchemaFragmentSymbol,
  optionalPropertyFlag,
  schemaFragmentFrag,
} from "./symbols";

export type Entity = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Document = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export type EntityFragment = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type DocumentFragment = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type SerializationContext = {
  entity: Entity;
  path: string[];
};

export type ValidationContext = SerializationContext;

export type DeserializationContext = {
  document: Document;
  path: string[];
};

export type TypeGeneratorContext = {
  import(name: string, from: string): void;
};

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

export type SchemaLike =
  | SchemaFragmentAggregate
  | SchemaFragment
  | ObjectSchemaSource
  | ArraySchemaSource;

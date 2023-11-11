import { Document, Entity, ObjectSchemaSource, SchemaFragment } from './types';
import { Field, FieldsSchemaRoot } from './astTypes';
import { createDocument, createEntity } from '../extract';
import { generateBsonSchema } from '../generateBsonSchema';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

// entityが余分なプロパティを持っていても許す
export function shape<T>(object: ObjectSchemaSource<T>): SchemaFragment<T> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode(): FieldsSchemaRoot {
      const props: Record<string, Field> = {};

      for (const [key, value] of Object.entries<SchemaFragment<unknown>>(object)) {
        props[key] = {
          kind: 'field',
          isOptional: !!value[optionalPropertyFlag],
          node: value.buildASTNode(),
        };
      }

      return {
        kind: 'object',
        props,
        allowAdditionalProps: Object.keys(props).length === 0, // TODO: 後で直すかも
      };
    },
  };
}

export function arrayOf<T>(fragment: SchemaFragment<T>): SchemaFragment<T[]> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'array',
        item: fragment.buildASTNode(),
      };
    },
  };
}

export function createFieldsSchema<T>(source: ObjectSchemaSource<T>): FieldsSchema<T> {
  const fragment = shape(source);
  const node = fragment.buildASTNode();

  if (node.kind !== 'object') {
    throw Error('Invalid state. This is bug.');
  }

  return new FieldsSchema<T>(node);
}

export class FieldsSchema<T> {
  _type?: T;

  _schemaRoot: FieldsSchemaRoot;

  constructor(schemaRoot: FieldsSchemaRoot) {
    this._schemaRoot = schemaRoot;
  }

  getSchemaAST(): FieldsSchemaRoot {
    return this._schemaRoot;
  }

  decode(entity: Entity): Document {
    return createDocument(entity, this.getSchemaAST()) as Document;
  }

  encode(document: Document, source: Record<string, unknown> = {}): Entity {
    return createEntity(source, document, this.getSchemaAST()) as Entity;
  }

  generateBsonSchema(): Record<string, unknown> {
    return generateBsonSchema(this.getSchemaAST());
  }
}

export function arrayOfShape<T>(object: ObjectSchemaSource<T>): SchemaFragment<T[]> {
  return arrayOf(shape(object));
}

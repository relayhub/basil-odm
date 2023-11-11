import { Document, Entity, ObjectSchemaSource, SchemaFragment } from './types';
import { Field, FieldsSchemaRoot } from './astTypes';
import { createDocument, createEntity } from '../extract';
import { generateBsonSchema } from '../generateBsonSchema';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

// entityが余分なプロパティを持っていても許す
export function shape<T extends ObjectSchemaSource>(source: T): SchemaFragment {
  const object: Record<string, SchemaFragment> = {};

  Object.keys(source).forEach((key: string) => {
    object[key] = source[key];
  });

  return {
    [schemaFragmentFrag]: true,

    buildASTNode(): FieldsSchemaRoot {
      const props: Record<string, Field> = {};

      for (const [key, value] of Object.entries(object)) {
        props[key] = {
          kind: 'field',
          isOptional: !!value[optionalPropertyFlag],
          node: value.buildASTNode(),
        };
      }

      return {
        kind: 'object',
        props,
        allowAdditionalProps: Object.keys(props).length === 0,
      };
    },
  };
}

export function arrayOf<T extends SchemaFragment>(fragment: T): SchemaFragment {
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

class Union implements SchemaFragment {
  schemaFragments: SchemaFragment[];

  [schemaFragmentFrag] = true as const;

  constructor(schemaFragments: SchemaFragment[]) {
    this.schemaFragments = schemaFragments;
  }

  buildASTNode() {
    return {
      kind: 'union' as const,
      items: this.schemaFragments.map((fragment) => fragment.buildASTNode()),
    };
  }
}

export function createFieldsSchema(source: ObjectSchemaSource) {
  const fragment = shape(source);
  const node = fragment.buildASTNode();

  if (node.kind !== 'object') {
    throw Error('Invalid state. This is bug.');
  }

  return new FieldsSchema(node);
}

export class FieldsSchema {
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

export function arrayOfShape<T extends ObjectSchemaSource>(object: T): SchemaFragment {
  return arrayOf(shape(object));
}

export function union(...schemas: SchemaFragment[]): SchemaFragment {
  return new Union(schemas);
}

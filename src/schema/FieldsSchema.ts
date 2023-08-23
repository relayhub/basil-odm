import { getSchemaFragment } from './utils';
import { literal } from './literal';
import { Document, Entity, ObjectSchemaSource, SchemaFragment, SchemaFragmentAggregate, SchemaLike } from './types';
import { Field, FieldsSchemaRoot } from './astTypes';
import { createDocument, createEntity } from '../extract';
import { generateBsonSchema } from '../generateBsonSchema';
import { getSchemaFragmentSymbol, optionalPropertyFlag, schemaFragmentFrag } from './symbols';

(String.prototype as unknown as SchemaFragmentAggregate)[getSchemaFragmentSymbol] = function (this: string) {
  return literal(this);
};

(Number.prototype as unknown as SchemaFragmentAggregate)[getSchemaFragmentSymbol] = function (this: number) {
  return literal(this);
};

(Boolean.prototype as unknown as SchemaFragmentAggregate)[getSchemaFragmentSymbol] = function (this: boolean) {
  return literal(this);
};

(Array.prototype as unknown as SchemaFragmentAggregate)[getSchemaFragmentSymbol] = function (this: Array<unknown>) {
  if (this.length === 0) {
    throw Error('You must pass one element at least into array.');
  }

  if (this.length > 1) {
    throw Error('You must pass one element into array on building schema.');
  }

  return arrayOf(this[0] as SchemaLike);
};

(Object.prototype as unknown as SchemaFragmentAggregate)[getSchemaFragmentSymbol] = function () {
  return shape(this as unknown as ObjectSchemaSource);
};

// entityが余分なプロパティを持っていても許す
export function shape<T extends ObjectSchemaSource>(source: T): SchemaFragment {
  const object: Record<string, SchemaFragment> = {};

  Object.keys(source).forEach((key: string) => {
    object[key] = getSchemaFragment(source[key]);
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

export function arrayOf<T extends SchemaLike>(item: T): SchemaFragment {
  const fragment = getSchemaFragment(item);

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

  constructor(schemas: SchemaLike[]) {
    this.schemaFragments = schemas.map((schema) => getSchemaFragment(schema));
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

export function union(...schemas: SchemaLike[]): SchemaFragment {
  return new Union(schemas);
}

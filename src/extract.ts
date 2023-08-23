import { SchemaNode, FieldsSchemaRoot, LiteralValue } from './schema/astTypes';
import { inspect } from 'util';
import { ObjectId } from 'mongodb';

export function createDocument(entity: Record<string, unknown>, rootNode: FieldsSchemaRoot): Record<string, unknown> {
  return extract(entity, rootNode, []) as Record<string, unknown>;
}

export function createEntity<T extends Record<string, unknown>>(source: T, document: Record<string, unknown>, rootNode: FieldsSchemaRoot): T {
  const object = extract(document, rootNode, []);
  return Object.assign(source, object);
}

const objectIdBsonType = new ObjectId()._bsontype;

export function extract(target: unknown, node: SchemaNode, paths: string[]): unknown {
  switch (node.kind) {
    case 'union':
      for (const item of node.items) {
        try {
          return extract(target, item, paths);
        } catch (e) {
          // do nothing
        }
      }
      throw error('Extracting union fail');

    case 'timestamp':
      throw error('Not implemented');

    case 'string':
      if (typeof target !== 'string') {
        throw error('Extracting string fail');
      }
      if (typeof node.maxLength === 'number' && target.length > node.maxLength) {
        throw error('Extracting string fail');
      }
      return target.toString();

    case 'reference':
      throw error('Not implemented');

    case 'objectId':
      if (!(target instanceof ObjectId) && (target as ObjectId)?._bsontype !== objectIdBsonType) {
        throw error('Extracting ObjectId fail');
      }

      return target;

    case 'object': {
      if (typeof target !== 'object' || target === null) {
        throw error('Extracting Object fail');
      }

      const record: Record<string, unknown> = {};
      for (const [name, field] of Object.entries(node.props)) {
        try {
          record[name] = extract((target as Record<string, unknown>) /* FIXME */[name], field.node, [...paths, name]);
        } catch (error) {
          if (!field.isOptional) {
            throw error;
          }
        }
      }

      if (node.allowAdditionalProps) {
        const fieldKeys = new Set(Object.keys(node.props));
        for (const [name, value] of Object.entries(target)) {
          if (!fieldKeys.has(name)) {
            record[name] = value;
          }
        }
      }

      return record;
    }

    case 'number':
      if (typeof target !== 'number') {
        throw error('Extract number value fail');
      }
      return target;

    case 'null':
      if (target !== null) {
        throw error('Extract null value fail');
      }
      return target;

    case 'boolean':
      if (typeof target !== 'boolean') {
        throw error('Extract boolean value fail');
      }
      return target;

    case 'literal':
      if (target !== node.value) {
        throw error('Extract literal value fail');
      }
      return target;

    case 'enum':
      if (!Object.values(node.values).includes(target as LiteralValue)) {
        throw error('Extract enum value fail');
      }
      return target;

    case 'date':
      if (!(target instanceof Date)) {
        throw error('Extract Date fail');
      }
      return target;

    case 'binary':
      throw error('Not implemented');

    case 'array':
      if (!Array.isArray(target)) {
        throw error('Extracting array fail.');
      }

      return target.map((item, index) => {
        return extract(item, node.item, [...paths, index.toString()]);
      });

    case 'record': {
      const record: Record<string, unknown> = {};

      if (target === undefined || target === null) {
        throw error('Extracting fail.');
      }

      for (const [key, value] of Object.entries(target as Record<string, unknown>)) {
        record[key] = extract(value, node.item, [...paths, key]);
      }

      return record;
    }

    default: {
      const _: never = node;
      throw Error();
    }
  }

  function error(message = 'ERROR: extractDocument() fail') {
    return Error(`${message}\npath = ${JSON.stringify(paths)}\ntarget = ${inspect(target)}\nschema = ${inspect(node)}`);
  }
}

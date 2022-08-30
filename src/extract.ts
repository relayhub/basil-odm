import {SchemaNode, SchemaRoot} from './schema/astTypes';
import {ObjectId} from 'mongodb';
import {inspect} from 'util';

export function createDocument(entity: Record<string, unknown>, rootNode: SchemaRoot): Record<string, any> {
  return extract(entity, rootNode, []);
}

export function createEntity<T extends {}>(source: T, document: Record<string, any>, rootNode: SchemaRoot): T {
  const object = extract(document, rootNode, []);
  return Object.assign(source, object);
}

export function extract(target: unknown, node: SchemaNode, paths: string[]): any {
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
      if (!(target instanceof ObjectId)) {
        throw error('Extracting ObjectId fail');
      }
      return target;

    case 'object':
      if (typeof target !== 'object' || target === null) {
        throw error('Extracting Object fail');
      }

      const record: Record<string, any> = {};
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
      if (!Object.values(node.values).includes(target as any)) {
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

    default:
      const _: never = node;
      throw Error();
  }

  function error(message: string = 'ERROR: extractDocument() fail') {
    return Error(`${message}\npath = ${JSON.stringify(paths)}\ntarget = ${inspect(target)}\nschema = ${inspect(node)}`);
  }
}

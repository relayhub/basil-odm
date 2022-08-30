import {SchemaNode} from './schema/astTypes';
import {ObjectId} from 'mongodb';

export interface ValidationMessage {
  target: unknown;
  paths: string[];
  node: SchemaNode;
  message?: string;
}

export function validate(target: any, node: SchemaNode, paths: string[]): ValidationMessage[] {
  switch (node.kind) {
    case 'union':
      for (const item of node.items) {
        const messages = validate(target, item, paths);
        if (messages.length === 0) {
          return [];
        }
      }
      return error();

    case 'timestamp':
      throw Error('Not implemented');

    case 'string':
      if (typeof target !== 'string') {
        return error('Target value is not string');
      }

      if (typeof node.maxLength === 'number' && target.length > node.maxLength) {
        return error('String length exceeds "maxLength"');
      }

      return [];

    case 'reference':
      throw Error('Not implemented');

    case 'objectId':
      if (!(target instanceof ObjectId)) {
        return error('Target value is not ObjectId');
      }
      return [];

    case 'object':
      const errors: ValidationMessage[] = [];

      if (typeof target !== 'object' || target === null) {
        return error();
      }

      const targetObject = target as Record<string, unknown>;

      for (const [name, field] of Object.entries(node.props)) {
        const shouldIgnore = field.isOptional && (targetObject[name] === null || targetObject[name] === undefined);
        if (!shouldIgnore) {
          errors.push(...validate(targetObject[name], field.node, [...paths, name]));
        }
      }

      // TODO: allowAdditionalPropsを見る

      return errors;

    case 'number':
      if (typeof target !== 'number') {
        return error('Target value is not number');
      }
      return [];

    case 'null':
      if (target !== null) {
        return error();
      }
      return [];

    case 'boolean':
      if (typeof target !== 'boolean') {
        return error('Target value is not boolean');
      }
      return [];

    case 'literal':
      if (target !== node.value) {
        return error();
      }
      return [];

    case 'enum':
      if (!Object.values(node.values).includes(target)) {
        return error('Target value does not match enum value');
      }
      return [];

    case 'date':
      if (!(target instanceof Date)) {
        return error('Target value is not Date object');
      }
      return [];

    case 'binary':
      throw Error('Not implemented');

    case 'array':
      if (!Array.isArray(target)) {
        return error('Target value is not array.');
      }

      return target.flatMap((item, index) => {
        return validate(item, node.item, [...paths, index.toString()]);
      });

    default:
      const _: never = node;
      return [];
  }

  function error(message: string = 'Validation fail'): ValidationMessage[] {
    return [
      {
        target,
        paths,
        message,
        node,
      },
    ];
  }
}

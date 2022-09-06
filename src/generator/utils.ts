import { Enum, ObjectNode, SchemaNode } from '../schema/astTypes';
import { singular } from 'pluralize';
import { CollectionDef } from '../types';

export function generateLiteralType(value: null | string | number | boolean): string {
  return generateLiteralValue(value);
}

export function generateLiteralValue(value: null | string | number | boolean): string {
  if (value === null) {
    return 'null';
  } else {
    return JSON.stringify(value);
  }
}

export function generateDefaultValue(node: SchemaNode): string {
  switch (node.kind) {
    case 'string':
      return '""';

    case 'number':
      return '0';

    case 'boolean':
      return 'false';

    case 'date':
      return 'new Date()';

    case 'null':
      return 'null';

    case 'objectId':
      return 'new mongodb.ObjectId()';

    case 'object': {
      const lines: string[] = [];
      lines.push('{');
      for (const [name, field] of Object.entries(node.props)) {
        if (!field.isOptional) {
          lines.push(JSON.stringify(name) + ': ' + generateDefaultValue(field.node) + ',');
        }
      }
      lines.push('}');
      return lines.join('\n');
    }

    case 'literal':
      return generateLiteralValue(node.value);

    case 'array':
      return '[]';

    case 'union':
      return generateDefaultValue(node.items[0]);

    case 'enum':
      return generateLiteralValue(Object.values(node.values)[0]);

    case 'timestamp':
    case 'binary':
    case 'reference':
      throw Error('Not implemented');

    default: {
      const _: never = node;
      throw Error();
    }
  }
}

export function getDefaultEntityName(collectionName: string): string {
  const name = singular(collectionName);
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

export function generateType(node: SchemaNode): string {
  switch (node.kind) {
    case 'string':
      return 'string';

    case 'number':
      return 'number';

    case 'boolean':
      return 'boolean';

    case 'date':
      return 'Date';

    case 'null':
      return 'null';

    case 'objectId':
      return 'mongodb.ObjectId';

    case 'object':
      return generateObjectType(node);

    case 'literal':
      return generateLiteralType(node.value);

    case 'array':
      return `Array<${generateType(node.item)}>`;

    case 'union': {
      const lines: string[] = [];
      for (const item of node.items) {
        lines.push('| ' + generateType(item));
      }

      return lines.join('');
    }

    case 'enum': {
      const lines: string[] = [];
      for (const value of Object.values(node.values)) {
        lines.push('| ' + generateLiteralType(value));
      }
      return lines.join('');
    }

    case 'timestamp':
    case 'binary':
    case 'reference':
      throw Error('Not implemented');

    default: {
      const _: never = node;
      throw Error();
    }
  }
}

function generateObjectType(object: ObjectNode) {
  const lines: string[] = [];
  lines.push('{');

  for (const [name, field] of Object.entries(object.props)) {
    lines.push(`${JSON.stringify(name)}${field.isOptional ? '?' : ''}: `);
    lines.push(generateType(field.node));
    lines.push(';');
  }

  lines.push('}');

  return lines.join('\n');
}

export function aggregateEnums(node: SchemaNode): Enum[] {
  const enums: Enum[] = [];
  _aggregateEnums(node, enums);
  return enums;
}

function _aggregateEnums(node: SchemaNode, enums: Enum[] = []) {
  switch (node.kind) {
    case 'enum':
      enums.push(node);
      return;

    case 'union':
      for (const item of node.items) {
        _aggregateEnums(item, enums);
      }
      return;

    case 'array':
      _aggregateEnums(node.item, enums);
      return;

    case 'object':
      for (const prop of Object.values(node.props)) {
        _aggregateEnums(prop.node, enums);
      }
      return;

    case 'binary':
    case 'boolean':
    case 'date':
    case 'literal':
    case 'null':
    case 'number':
    case 'objectId':
    case 'string':
    case 'reference':
    case 'timestamp':
      return;

    default: {
      const _: never = node;
      throw Error();
    }
  }
}

import { FieldsSchemaRoot, Enum } from '../schema/astTypes';
import { CollectionDef, DefinedSchema } from '../types';
import { writeFileSync } from 'fs';
import { prettier } from '../utils';
import { aggregateEnums, generateDefaultValue, generateType } from './utils';
import { inspect } from 'util';

const defaultImportSource = 'basil-odm';
const generateHeader = (importSource: string = defaultImportSource) => `/**
 * This file was generated by Basil ODM
 * Do not make changes to this file directly
 */
/* eslint-disable */
import * as $$mongodb from 'mongodb';
import * as $$basil from '${importSource}';

`;

export function generateEnumsCode(collections: CollectionDef[]): string {
  let code = '';

  let enums = collections.flatMap((collection) => {
    const root = collection.fields.getSchemaAST();
    return aggregateEnums(root);
  });

  // remove duplicated
  const enumsMap = new Map<string, Enum>();
  for (const node of enums) {
    if (typeof node.name === 'string') {
      if (enumsMap.has(node.name)) {
        const storedNode = enumsMap.get(node.name) as Enum;
        if (storedNode !== node && JSON.stringify(storedNode) !== JSON.stringify(node)) {
          throw Error(
            `These enums node has same name but different object: ${inspect(node)} ${inspect(
              storedNode
            )}`
          );
        }
      } else {
        enumsMap.set(node.name, node);
      }
    }
  }

  enums = [...enumsMap.values(), ...enums.filter((node) => typeof node.name !== 'string')];

  for (const node of enums) {
    if (node.name) {
      code += `export const ${node.name} = {`;
      for (const [key, value] of Object.entries(node.values)) {
        code += `${JSON.stringify(key)}: ${JSON.stringify(value)},`;
      }
      code += `} as const;\n`;

      code += `export type ${node.name} = typeof ${node.name}[keyof typeof ${node.name}];\n\n`;
    }
  }

  return code;
}

export function generateTypeScriptFile(config: CodeGeneratorConfig): string {
  const collections = Object.values(config.schema);

  return [
    generateHeader(config.importSource),
    generateDocumentTypes(collections),
    generateEnumsCode(collections),
    generateCollectionAccessObjects(collections),
  ].join('');
}

export function generateCollectionAccessObjects(collections: CollectionDef[]): string {
  const collectionMap = collections.reduce((map, collection) => {
    map.set(collection.collectionName, collection);
    return map;
  }, new Map<string, CollectionDef>());

  function generateDbType() {
    let code = `{`;
    for (const collection of collections) {
      code += `${JSON.stringify(collection.collectionName)}: $$basil.BasilCollection<${
        collection.entityName
      }, ${generateEdgesType(collection, collectionMap)}>,`;
    }
    code += `}\n\n`;
    return code;
  }

  let code = `const $$db: ${generateDbType()} = {`;

  for (const collection of collections) {
    code += `
      ${JSON.stringify(collection.collectionName)}: new $$basil.BasilCollection<${
      collection.entityName
    }, ${generateEdgesType(collection, collectionMap)}>(() => ({
        collectionName: ${JSON.stringify(collection.collectionName)},
        fields: new $$basil.FieldsSchema(${JSON.stringify(
          collection.fields.getSchemaAST(),
          null,
          '  '
        )}),
        Entity: ${collection.entityName},
        indexes: ${JSON.stringify(collection.indexes, null, '  ')} as const,
        options: ${JSON.stringify(collection.options ?? {}, null, '  ')},
        edges: ${generateRuntimeEdgesInfoForCAOs(collection, collectionMap)},
      })),
    `;
  }

  code += `};\n\n`;
  code += `export default $$db;\n\n`;

  return code;
}

export function generateDocumentTypes(collections: CollectionDef[]): string {
  let code = ``;

  for (const collection of collections) {
    const ast = collection.fields.getSchemaAST();

    code += `
      export class ${collection.entityName} extends $$basil.Base {
        constructor(params?: Partial<${collection.entityName}>) {
          super();
          Object.assign(this, params);
        }
    `;

    for (const [name, field] of Object.entries(ast.props)) {
      code += `${name}${field.isOptional ? '?' : ''}: ${generateType(field.node)}`;
      if (!field.isOptional) {
        code += '= ' + generateDefaultValue(field.node);
      }
      code += ';\n';
    }

    code += '}\n\n';
  }

  return code;
}

function generateEdgesType(collection: CollectionDef, collectionMap: Map<string, CollectionDef>) {
  return `{${Object.entries(collection.edges ?? {})
    .map(([name, edge]) => {
      const referencedCollectionDef = collectionMap.get(edge.collection);
      if (!referencedCollectionDef) {
        throw Error(`Not defined collection: ${edge.collection}`);
      }

      switch (edge.type) {
        case 'hasOne':
          return `${JSON.stringify(name)}: ${referencedCollectionDef.entityName}, `;
        case 'hasMany':
          return `${JSON.stringify(name)}: ${referencedCollectionDef.entityName}[], `;
      }

      throw Error('Unknown edge type: ' + JSON.stringify(edge));
    })
    .join('')}}`;
}

function generateRuntimeEdgesInfoForCAOs(
  collection: CollectionDef,
  collectionMap: Map<string, CollectionDef>
) {
  if (!collection.edges) {
    return `{}`;
  }

  return `{${Object.entries(collection.edges)
    .map(([key, edge]) => {
      const referencedCollectionDef = collectionMap.get(edge.collection)!;
      if (!referencedCollectionDef) {
        throw Error(`Not defined collection: ${edge.collection}`);
      }

      switch (edge.type) {
        case 'hasOne':
          return `${JSON.stringify(key)}: {
  type: 'hasOne' as const,
  collection: $$db[${JSON.stringify(referencedCollectionDef.collectionName)}],
  referenceField: ${JSON.stringify(edge.referenceField)}
},`;
        case 'hasMany':
          return `${JSON.stringify(key)}: {
  type: 'hasMany' as const,
  collection: $$db[${JSON.stringify(referencedCollectionDef.collectionName)}],
  referenceField: ${JSON.stringify(edge.referenceField)}
},`;
      }

      throw Error('Unknown edge type: ' + JSON.stringify(edge));
    })
    .join('\n')}}`;
}

export function generateTypeFromSchema(root: FieldsSchemaRoot) {
  return generateType(root);
}

interface CodeGeneratorConfig {
  outputFile?: string;
  schema: DefinedSchema;
  importSource?: string;
}

export function generateCode(config: CodeGeneratorConfig) {
  const code = prettier(generateTypeScriptFile(config));
  if (config.outputFile) {
    writeFileSync(config.outputFile, code);
  } else {
    console.log(code);
  }
}

import { DefinedSchema, CollectionDef, collectionDefSymbol } from './types';

export function parseSchema(target: Record<string, unknown>): DefinedSchema {
  const schema: Record<string, CollectionDef> = {};
  for (const [key, value] of Object.entries(target)) {
    if (typeof value !== 'object' || value === null) {
      continue;
    }

    if ((value as CollectionDef)[collectionDefSymbol]) {
      schema[key] = value as CollectionDef;
    }
  }

  const collectionDefs = Object.values(schema);

  // check duplicate collection name
  const collectionMap = new Map<string, CollectionDef>();
  for (const collectionDef of collectionDefs) {
    if (collectionMap.has(collectionDef.collectionName)) {
      throw Error(`Duplicate collection name: ${collectionDef.collectionName}`);
    }
    collectionMap.set(collectionDef.collectionName, collectionDef);
  }

  // check edge fields
  for (const collectionDef of collectionDefs) {
    if (collectionDef.edges) {
      const fieldNameSet = new Set<string>(Object.keys(collectionDef.fields.getSchemaAST().props));

      for (const edgeName of Object.keys(collectionDef.edges)) {
        if (fieldNameSet.has(edgeName)) {
          throw Error(`Conflict field name: ${JSON.stringify(edgeName)}`);
        }
      }

      for (const edge of Object.values(collectionDef.edges)) {
        switch (edge.type) {
          case 'hasOne': {
            if (!collectionMap.has(edge.collection)) {
              throw Error(`Edge collection not found: ${JSON.stringify(edge.collection)}`);
            }

            if (!fieldNameSet.has(edge.referenceField)) {
              throw Error(`Reference field not found: ${JSON.stringify(edge.referenceField)}`);
            }
            continue;
          }

          case 'hasMany': {
            if (!collectionMap.has(edge.collection)) {
              throw Error(`Edge collection not found: ${JSON.stringify(edge.collection)}`);
            }

            const collection = collectionMap.get(edge.collection);
            const fieldNameSet = new Set<string>(Object.keys(collection!.fields.getSchemaAST().props));
            if (!fieldNameSet.has(edge.referenceField)) {
              throw Error(`Reference field not found: ${JSON.stringify(edge.referenceField)}`);
            }
            continue;
          }
        }

        throw Error('Unknown edge type: ' + JSON.stringify(edge));
      }
    }
  }

  return schema;
}

import { CollectionDef, Index, CollectionOptions, collectionDefSymbol } from '../types';
import { createFieldsSchema } from './FieldsSchema';
import { ObjectSchemaSource } from './types';
import { Edge } from './edgeTypes';
import { getDefaultEntityName } from '../generator/utils';
interface Props {
  collectionName: string;
  fields?: ObjectSchemaSource<unknown>;
  indexes?: Index[];
  entityName?: string;
  options?: CollectionOptions;
  edges?: Record<string, Edge>;
}

export function collection(props: Props): CollectionDef {
  return {
    [collectionDefSymbol]: true,
    collectionName: props.collectionName,
    entityName: props.entityName || getDefaultEntityName(props.collectionName),
    fields: createFieldsSchema(props.fields || {}),
    indexes: props.indexes || [],
    options: props.options,
    edges: props.edges,
  };
}

import { CollectionDef, Index, CollectionOptions } from '../types';
import { createFieldsSchema } from './FieldsSchema';
import { ObjectSchemaSource } from './types';
import * as mongodb from 'mongodb';

interface Props {
  collectionName: string;
  fields?: ObjectSchemaSource;
  indexes?: Index[];
  entityName?: string;
  options?: CollectionOptions;
}

export function collection(props: Props): CollectionDef {
  return {
    collectionName: props.collectionName,
    entityName: props.entityName || null,
    schema: createFieldsSchema(props.fields || {}),
    indexes: props.indexes || [],
    options: props.options,
  };
}

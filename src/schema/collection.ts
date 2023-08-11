import { CollectionDef, Index } from '../types';
import { createFieldsSchema } from './FieldsSchema';
import { ObjectSchemaSource } from './types';

interface Props {
  collectionName: string;
  fields?: ObjectSchemaSource;
  indexes?: Index[];
  entityName?: string;
}

export function collection(props: Props): CollectionDef {
  return {
    collectionName: props.collectionName,
    entityName: props.entityName || null,
    schema: createFieldsSchema(props.fields || {}),
    indexes: props.indexes || [],
  };
}

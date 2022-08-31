import { CollectionDef, Index } from '../types';
import { createFieldsSchema, FieldsSchema } from './FieldsSchema';
import { ObjectSchemaSource } from './types';

interface Props {
  collectionName: string;
  fields?: ObjectSchemaSource;
  indexes?: Index[];
  entityName?: string;
}

export class CollectionSchema implements CollectionDef {
  _collectionName: string;
  _fields: FieldsSchema;
  _indexes: Index[];
  _entityName: string | null = null;

  constructor(props: Props) {
    const { collectionName, fields = {}, indexes = [], entityName = null } = props;

    this._collectionName = collectionName;
    this._fields = createFieldsSchema(fields);
    this._indexes = indexes;
    this._entityName = entityName;
  }

  get collectionName(): string {
    return this._collectionName;
  }

  get entityName(): string | null {
    return this._entityName;
  }

  get schema(): FieldsSchema {
    return this._fields;
  }

  get indexes(): Index[] {
    return this._indexes;
  }
}

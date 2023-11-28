import { createFieldsSchema } from './schema/FieldsSchema';
import { RuntimeCollectionSchema } from './types';
import * as mongodb from 'mongodb';

/**
 * @internal
 */
export type BaseClass<T, E = unknown> = typeof Base & {
  new (): T;
  getRuntimeSchema(): RuntimeCollectionSchema<T, E>;
};

export type FindByIdsOptions<T extends mongodb.Document> = mongodb.FindOptions<T> & {
  filter?: mongodb.Filter<T>;
};

export class Base {
  /**
   * @internal
   */
  static getRuntimeSchema(): RuntimeCollectionSchema<unknown, unknown> {
    return {
      fields: createFieldsSchema({}),
      indexes: [],
      collectionName: '',
    };
  }
}

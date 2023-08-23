import { IndexFields, Index } from '../types';
import mongodb from 'mongodb';

export function index(fields: IndexFields, options: mongodb.CreateIndexesOptions = {}): Index {
  return {
    fields,
    options,
  };
}

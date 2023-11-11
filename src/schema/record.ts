import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

export function record<T>(fragment: SchemaFragment<T>): SchemaFragment<Record<string, T>> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'record',
        item: fragment.buildASTNode(),
      };
    },
  };
}

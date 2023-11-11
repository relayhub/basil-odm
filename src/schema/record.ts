import { SchemaFragment, SchemaLike } from './types';
import { schemaFragmentFrag } from './symbols';

export function record<T extends SchemaFragment>(fragment: T): SchemaFragment {
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

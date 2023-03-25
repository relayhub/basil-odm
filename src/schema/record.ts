import { SchemaFragment, SchemaLike } from './types';
import { schemaFragmentFrag } from './symbols';
import { getSchemaFragment } from './utils';

export function record<T extends SchemaLike>(schemaLike: T): SchemaFragment {
  const fragment = getSchemaFragment(schemaLike);

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

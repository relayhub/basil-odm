import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

export function object(): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'object',
        props: {},
        allowAdditionalProps: true,
      };
    },
  };
}

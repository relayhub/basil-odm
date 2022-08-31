import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalBoolean(): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'boolean',
      };
    },
  };
}

export const boolean: typeof originalBoolean & SchemaFragment = Object.assign(originalBoolean, originalBoolean());

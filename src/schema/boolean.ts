import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalBoolean(): SchemaFragment<boolean> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'boolean',
      };
    },
  };
}

export const boolean: typeof originalBoolean & SchemaFragment<boolean> = Object.assign(
  originalBoolean,
  originalBoolean()
);

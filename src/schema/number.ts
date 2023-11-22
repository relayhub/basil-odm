import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalNumber(): SchemaFragment<number> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return { kind: 'number' };
    },
  };
}

export const number: typeof originalNumber & SchemaFragment<number> = Object.assign(
  originalNumber,
  originalNumber()
);

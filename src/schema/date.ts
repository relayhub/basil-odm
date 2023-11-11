import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalDate(): SchemaFragment<Date> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return { kind: 'date' };
    },
  };
}

export const date: typeof originalDate & SchemaFragment<Date> = Object.assign(originalDate, originalDate());

import {SchemaFragment} from './types';
import {schemaFragmentFrag} from './symbols';

function originalDate(): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {kind: 'date'};
    },
  };
}

export const date: typeof originalDate & SchemaFragment = Object.assign(originalDate, originalDate());

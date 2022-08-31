import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalObjectId(): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'objectId',
      };
    },
  };
}

export const objectId: typeof originalObjectId & SchemaFragment = Object.assign(originalObjectId, originalObjectId());

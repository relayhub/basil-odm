import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';
import { ObjectId } from 'mongodb';

function originalObjectId(): SchemaFragment<ObjectId> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'objectId',
      };
    },
  };
}

export const objectId: typeof originalObjectId & SchemaFragment<ObjectId> = Object.assign(originalObjectId, originalObjectId());

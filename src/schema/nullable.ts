import { SchemaFragment } from './types';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

export function nullable<T extends SchemaFragment>(fragment: T): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'union',
        items: [{ kind: 'null' }, fragment.buildASTNode()],
      };
    },

    [optionalPropertyFlag]: true,
  };
}

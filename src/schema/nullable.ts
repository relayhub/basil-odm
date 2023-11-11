import { SchemaFragment } from './types';
import { optionalPropertyFlag, schemaFragmentFrag } from './symbols';

export function nullable<T>(fragment: SchemaFragment<T>): SchemaFragment<null | T> {
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

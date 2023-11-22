import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

export function union<T extends SchemaFragment<unknown>[]>(
  ...schemas: T
): SchemaFragment<InferSchemaFragmentType<T[number]>> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'union' as const,
        items: schemas.map((fragment) => fragment.buildASTNode()),
      };
    },
  };
}

type InferSchemaFragmentType<T extends SchemaFragment<unknown>> = T extends SchemaFragment<infer U>
  ? U
  : never;

import { SchemaFragment } from './types';
import { schemaFragmentFrag } from './symbols';

function originalString(options: { maxLength?: number } = {}): SchemaFragment<string> {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: 'string',
        maxLength: options.maxLength,
      };
    },
  };
}

export const string: typeof originalString & SchemaFragment<string> = Object.assign(originalString, originalString());

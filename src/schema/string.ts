import { SchemaFragment } from "./types";
import { schemaFragmentFrag } from "./symbols";

function originalString(options: { maxLength?: number } = {}): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: "string",
        maxLength: options.maxLength,
      };
    },
  };
}

export const string: typeof originalString & SchemaFragment = Object.assign(
  originalString,
  originalString(),
);

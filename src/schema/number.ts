import { SchemaFragment } from "./types";
import { schemaFragmentFrag } from "./symbols";

function originalNumber(): SchemaFragment {
  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return { kind: "number" };
    },
  };
}

export const number: typeof originalNumber & SchemaFragment = Object.assign(
  originalNumber,
  originalNumber(),
);

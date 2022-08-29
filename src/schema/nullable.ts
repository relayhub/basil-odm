import { SchemaFragment, SchemaLike } from "./types";
import { getSchemaFragment } from "./utils";
import { optionalPropertyFlag, schemaFragmentFrag } from "./symbols";

export function nullable<T extends SchemaLike>(schemaLike: T): SchemaFragment {
  const fragment = getSchemaFragment(schemaLike);

  return {
    [schemaFragmentFrag]: true,

    buildASTNode() {
      return {
        kind: "union",
        items: [{ kind: "null" }, fragment.buildASTNode()],
      };
    },

    [optionalPropertyFlag]: true,
  };
}

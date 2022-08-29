import { SchemaNode } from "./schema/astTypes";
import { inspect } from "util";

export function generateBsonSchema(node: SchemaNode): Record<string, any> {
  switch (node.kind) {
    case "union":
      return {
        anyOf: node.items.map((item) => generateBsonSchema(item)),
      };

    case "timestamp":
      throw error("Not implemented");

    case "string":
      return {
        bsonType: "string",
      };

    case "reference":
      throw error("Not implemented");

    case "objectId":
      return {
        bsonType: "objectId",
      };

    case "object":
      const properties: { [key: string]: any } = {};
      const required: string[] = [];

      Object.keys(node.props).forEach((key) => {
        const field = node.props[key];

        properties[key] = generateBsonSchema(field.node);
        if (!field.isOptional) {
          required.push(key);
        }
      });

      return {
        bsonType: "object",
        ...(Object.keys(node.props).length === 0 ? {} : { properties }),
        additionalProperties: Object.keys(node.props).length === 0,
        ...(required.length > 0 ? { required } : {}),
      };

    case "number":
      return {
        bsonType: "number",
      };

    case "null":
      return { bsonType: "null" };

    case "boolean":
      return { bsonType: "bool" };

    case "literal":
      return { enum: [node.value] };

    case "enum":
      return { enum: Object.values(node.values) };

    case "date":
      return { bsonType: "date" };

    case "binary":
      throw error("Not implemented");

    case "array":
      return { bsonType: "array", items: generateBsonSchema(node.item) };

    default:
      const _: never = node;
      throw Error();
  }

  function error(message: string = "") {
    return Error(`${message}\nschema = ${inspect(node)}`);
  }
}

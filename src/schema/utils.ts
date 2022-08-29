import { inspect } from "util";
import {
  DeserializationContext,
  SchemaFragment,
  SchemaFragmentAggregate,
  SchemaLike,
  SerializationContext,
  TypeGeneratorContext,
  ValidationContext,
} from "./types";
import { literal } from "./literal";
import { getSchemaFragmentSymbol, schemaFragmentFrag } from "./symbols";
import { EOL } from "os";

export class TypeGeneratorContextImpl implements TypeGeneratorContext {
  importMap: Map<
    string,
    {
      name: string;
      from: string;
    }
  > = new Map();
  nameSet: Set<string> = new Set();

  import(name: string, from: string): void {
    const key = `${name}:${from}`;
    if (!this.importMap.has(key)) {
      this.importMap.set(key, { name, from });

      if (this.nameSet.has(name)) {
        throw Error(`Duplicated import name: ${name}`);
      } else {
        this.nameSet.add(name);
      }
    }
  }

  generateHeaderCode(): string {
    const lines: string[] = [];
    for (const { name, from } of this.importMap.values()) {
      lines.push(`import {${name}} from ${JSON.stringify(from)};`);
    }
    return lines.join(EOL);
  }
}

export function isSchemaFragment(
  schemaFragment: unknown,
): schemaFragment is SchemaFragment {
  return !!(schemaFragment as SchemaFragment)[schemaFragmentFrag];
}

export class SerializationError extends Error {
  constructor(message: string, context: SerializationContext) {
    super(
      `${message}\nentity: ${
        JSON.stringify(context.entity, null, "  ")
      }\npath: ${
        JSON.stringify(
          context.path,
          null,
          "  ",
        )
      }`,
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DeserializationError extends Error {
  constructor(message: string, context: DeserializationContext) {
    super(
      `${message}\ndocument: ${
        JSON.stringify(context.document, null, "  ")
      }\npath: ${
        JSON.stringify(
          context.path,
          null,
          "  ",
        )
      }`,
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  constructor(message: string, context: ValidationContext) {
    super(
      `${message}\nentity: ${
        JSON.stringify(context.entity, null, "  ")
      }\npath: ${
        JSON.stringify(
          context.path,
          null,
          "  ",
        )
      }`,
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function getSchemaFragment(target: SchemaLike): SchemaFragment {
  if (target === undefined) {
    throw TypeError(`Can't create schema fragment from undefined value.`);
  }

  if (
    target === null || typeof target === "string" ||
    typeof target === "number" || typeof target === "boolean"
  ) {
    return literal(target);
  }

  if (isSchemaFragment(target)) {
    return target;
  }

  if (
    (target as SchemaFragmentAggregate)[getSchemaFragmentSymbol] instanceof
      Function
  ) {
    return (target as SchemaFragmentAggregate)[getSchemaFragmentSymbol]();
  }

  throw TypeError(`Can't create schema fragment from "${inspect(target)}".`);
}

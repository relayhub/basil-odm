export type FieldsSchemaRoot = ObjectNode;

export type SchemaNode =
  | ObjectNode
  | ArrayNode
  | Union
  | Value
  | Literal
  | Enum
  | Reference
  | RecordNode;

export type ObjectNode = {
  kind: 'object';
  props: {
    [key: string]: Field;
  };
  allowAdditionalProps: boolean;
};

export type Field = {
  kind: 'field';
  isOptional: boolean;
  node: SchemaNode;
};

// 他のドキュメントを参照する
export type Reference = {
  kind: 'reference';
  node: StringValue | ObjectIdValue;
  collectionName?: string; // 省略された場合には、自身のコレクションを参照する
  path: string; // field名をdotで繋げたもの。 例: 'workspace.id'
};

export type ArrayNode = {
  kind: 'array';
  item: SchemaNode;
};

export type RecordNode = {
  kind: 'record';
  item: SchemaNode;
};

export type Union = {
  kind: 'union';
  items: SchemaNode[];
};

export type LiteralValue = string | boolean | null | number;

export type Literal = {
  kind: 'literal';
  value: LiteralValue;
};

export type Enum = {
  kind: 'enum';
  values: Record<string, LiteralValue>;
  name?: string;
};

export type Value =
  | StringValue
  | NumberValue
  | ObjectIdValue
  | NullValue
  | BooleanValue
  | DateValue
  | TimestampValue
  | BinaryValue;

export type StringValue = {
  kind: 'string';
  maxLength?: number;
};

export type NumberValue = {
  kind: 'number';
};

export type ObjectIdValue = {
  kind: 'objectId';
};

export type NullValue = {
  kind: 'null';
};

export type BooleanValue = {
  kind: 'boolean';
};

export type DateValue = {
  kind: 'date';
};

export type TimestampValue = {
  kind: 'timestamp';
};

export type BinaryValue = {
  kind: 'binary';
};

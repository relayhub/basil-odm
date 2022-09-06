/**
 * スキーマを表現するASTを定義する
 *
 * 目的:
 *  - インスペクション可能なデータ構造を提供する
 *  - スキーマを変換したり操作したりできるようにする
 *  - 様々なアウトプットに対応できるようにする(例: json-schema, TypeScriptの型、bson-schema、その他コードなど)
 *  - コレクションのドキュメント同士のリレーションを定義できるようにする
 **/

export type SchemaRoot = ObjectNode;

export type SchemaNode = ObjectNode | ArrayNode | Union | Value | Literal | Enum | Reference;

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

export type Value = StringValue | NumberValue | ObjectIdValue | NullValue | BooleanValue | DateValue | TimestampValue | BinaryValue;

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

// TODO decimal, int, doubleあたりのデータ型を追加する
// TODO numberを無くす
// TODO 数値型の場合には、制限を設けるパラメータを付ける(範囲など)

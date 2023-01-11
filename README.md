# Basil ODM [![CI](https://github.com/anatoo/basil-odm/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/anatoo/basil-odm/actions/workflows/ci.yaml)

Basil is an Object-Document Mapper for TypeScript and MongoDB.

Basilは以下のような特徴を持っているODMです。

- コレクションがどのようなフィールドや制約を持っているかをSchemaに記述することでTypeScriptのモデルを生成します。生成されるモデルは型安全です
- Schemaを記述することで、コレクションごとのインデックスやBSON Schemaの設定できます

## Install

```bash
$ npm install mongodb basil-odm --save
```

## Getting Started


プロジェクトのディレクトリに `basil.config.cjs` という設定ファイルを作ります。

```javascript
// basil.config.cjs
module.exports = {
  database: 'relayhub',
  connectionUri: process.env.MONGODB_URI
};
```

データベースのスキーマを書きます。

```typescript
// TODO: スキーマのコードを書く

```

データベースのスキーマからコードを生成します。

```typescript
// TODO: コード生成のコードを書く
```

モデルのコードが生成されます。

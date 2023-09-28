# Getting started

## Install

```bash
$ npm install mongodb basil-odm --save
```

## Add a configuration file

`basil.config.cjs`

```javascript
module.exports = {
  database: 'mydb',
  connectionUri: 'mongodb://localhost:27017'
};
```

Start MongoDB server and set its connection URI and database name.

## Define a database schema in TypeScript

`schema.ts`

```typescript
import * as b from 'basil-odm';

export const blogEntries = b.collection({
  collectionName: 'blogEntries',
  fields: {
    _id: b.objectId(),
    title: b.string(),
    content: b.string(),
    createdAt: b.date(),
  },
  indexes: [
    b.index({createdAt: -1}),
  ],
});
```

The schema describes what fields and indexes are in the documents of the collection.

## Apply the defined schema to the database

`prepare-db.ts`

```typescript
import {disconnect, prepareDb} from 'basil-odm';
import * as schema from './schema'; // import your schema

const prepare = async () => {
  await prepareDb(schema);
  await disconnect();
};

prepare();
```

```bash
$ npx tsx ./prepare-db.ts
```

If nothing goes wrong, create  collections described by schema in the database and set schema validation and indexes.

## Generate models from the schema

`generate.ts`

```typescript
import {generateCode} from 'basil-odm';
import {join} from 'path';
import * as schema from './schema'; // import your schema

generateCode({
  schema: schema,
  outputFile: join(__dirname, 'basil-gen.ts'),
});
```

```bash
$ npx tsx ./generate.ts
```

TypeScript models for accessing the database will be generated in `basil-gen.ts`.

## Examples of using the generated code

Through the generated code, you can query and store data in MongoDB collections.

### `insertOne()`

```typescript
import {BlogEntry} from './basil-gen'; // import from generated code

(async () => {
  const entry = new BlogEntry({
    name: 'My First Entry',
    content: 'blablabla',
    createdAt: new Date(),
  });
  
  await BlogEntry.insertOne(entry);
})();
```

### `findMany()`

```typescript
import {BlogEntry} from './basil-gen'; // import from generated code

(async () => {
  const entreis = await BlogEntry.findMany({}, {limit: 10});
  
  console.log(entries);
})();
```

### `save()`

```typescript
import {BlogEntry} from './basil-gen'; // import from generated code

(async () => {
  const entry = BlogEntry.findOne({
    name: 'My First Entry',
  });
  entry.name = "foobar";
  
  await BlogEntry.save(entry);
})();
```

### `deleteOne()`

```typescript
import {BlogEntry} from './basil-gen'; // import from generated code

(async () => {
  await BlogEntry.deleteOne({
    name: "foobar"
  });
})();
```

# Basil ODM [![CI](https://github.com/anatoo/basil-odm/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/anatoo/basil-odm/actions/workflows/ci.yaml)

Basil is a TypeScript ODM for MongoDB.

## Getting Started

### Install

```bash
$ npm install mongodb basil-odm --save
```

### Add a configuration file

```javascript
// basil.config.cjs
module.exports = {
  database: 'mydb',
  connectionUri: 'mongodb://localhost:27017'
};
```

### Define a database schema in TypeScript

```typescript
// schema.ts
import {
  collection,
  objectId,
  date,
  string,
  index,
} from 'basil-odm';

const blogEntries = collection({
  collectionName: 'blogEntries',
  fields: {
    _id: objectId,
    title: string,
    content: string,
    createdAt: date,
  },
  indexes: [
    index({createdAt: -1}),
  ],
});

export const collections = [
  blogEntries
];
```

### Apply the defined schema to the database

```typescript
// prepare-db.ts
import {Basil, prepareCollections} from 'basil-odm';
import {collections} from './schema'; // import your schema

const prepare = async () => {
  const basil = await Basil.connect();
  await prepareCollections(collections);
  await basil.close();
};

prepare();
```

```bash
$ npx tsx prepare-db.ts
```

### Generate models from the schema

```typescript
// generate.ts
import {generateCode} from 'basil-odm';
import {join, dirname} from 'path';
import {collections} from './schema'; // import your schema

generateCode({
  collections: collections,
  outputFile: join(__dirname, 'basil-gen.ts'),
});
```

```bash
$ npx tsx generate.ts
```

### CRUD examples

```typescript
import {BlogEntry} from './basil-gen'; // import from generated code

(async () => {
  const entry = new BlogEntry({
    name: 'My First Entry',
    content: 'blablabla',
    createdAt: new Date(),
  });
  
  await BlogEntry.insertOne(entry);
  
  const entries = await BlogEntry.findMany({
    createdAt: {
      $gt: new Date('2022-10-10')
    }
  });
  
  await BlogEntry.updateOne({
    name: 'My First Entry'
  }, {
    content: 'updated text'
  });

  await BlogEntry.deleteOne({
    name: 'My First Entry'
  });
})();
```

### Docs

 - [Manage Connections](./docs/01_connection.md)
 - [Define the schema](./docs/02_schema.md)

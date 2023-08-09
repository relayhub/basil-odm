## Getting started

### Install

```bash
$ npm install mongodb basil-odm --save
```

### Add a configuration file

`basil.config.cjs`
```javascript
module.exports = {
  database: 'mydb',
  connectionUri: 'mongodb://localhost:27017'
};
```

### Define a database schema in TypeScript

`schema.ts`
```typescript
import {
  collection,
  objectId,
  date,
  string,
  index,
} from 'basil-odm';

export const blogEntries = collection({
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
```

### Apply the defined schema to the database

`prepare-db.ts`

```typescript
import {Basil, prepareCollections} from 'basil-odm';
import * as schema from './schema'; // import your schema

const prepare = async () => {
  const basil = await Basil.connect();
  await prepareCollections(schema);
  await basil.close();
};

prepare();
```

```bash
$ npx tsx ./prepare-db.ts
```

### Generate models from the schema

`generate.ts`
```typescript
import {generateCode} from 'basil-odm';
import {join, dirname} from 'path';
import * as schema from './schema'; // import your schema

generateCode({
  schema: schema,
  outputFile: join(__dirname, 'basil-gen.ts'),
});
```

```bash
$ npx tsx ./generate.ts
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

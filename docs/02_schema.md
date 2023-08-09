# Define your schema

Basil ODM allows you to write a schema in TypeScript. It allows you to set up [schema validation](https://www.mongodb.com/docs/manual/core/schema-validation/) and [indexes](https://www.mongodb.com/docs/v6.0/indexes/) for Mongo DB collections. You can also generate a fully type-safe model from the schema.

This page describes how to define the schema using Basil ODM and TypeScript.
   
## Basics

You can set the schema for a collection using the `collection()` function. It describes the name of the collection, the index of the collection, and what fields the collection will have.

`schema.ts`

```typescript
import * as b from 'basil-odm';

export const users = b.collection({
  collectionName: 'users',
  fields: {
    _id: b.objectId(),
    name: b.string(),
    email: b.string(),
    createdAt: b.date(),
  },
  indexes: [
    b.index({email: 1}, {unique: true}),
  ]
});
```

> NOTE: When you add a record to a collection, MongoDB automatically adds an `ObjectID` value to the `_id` field. However, if you are writing the schema in Basil ODM, you must explicitly define the `_id` property to be of type `ObjectID`.


### Prepare schema validation and indexes in database

MongoDB allows you to set schema validation and indexes for a collection. Schema validation allows you to restrict what fields a document in that collection should have.

`prepare-db.ts`

```typescript
import {disconnect, prepareCollections} from 'basil-odm';
import * as schema from './schema'; // import your schema

(async () => {
  await prepareCollections(schema);
  await disconnect();
})();
```

```bash
$ npx tsx ./prepare-db.ts
```

> NOTE: We use [`tsx`](https://www.npmjs.com/package/tsx) to run TypeScript, but `ts-node` and others should also work.

If nothing goes wrong, schema validation and index are set for each collection in the database. Even if the database already has a collection with schema validation and index set, Basil ODM will successfully reconfigure the schema validation and indexes.

### Generate models from defined schema

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

If nothing goes wrong, TypeScript code will be generated in the specified file path.

## References

- [objectId()](#objectId)
- [string()](#string)
- [number()](#number)
- [boolean()](#boolean)
- [enum()](#enum)
- [date()](#date)
- [literal()](#literal)
- [nullable()](#nullable)
- [record()](#record)
- [shape()](#shape)
- [arrayOf()](#arrayOf)
- [union()](#union)
- [index()](#index)

### `objectId()`

The `objectId()` function defines that a field has a value of ObjectID.

```typescript
import * as b from 'basil-odm';

const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
  }
});
```

The initial value of this type field is `new ObjectId()`.

### `string()`

The `string()` function defines that a field has a string value.

```typescript
import * as b from 'basil-odm';

const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
    name: b.string(),
  }
});
```

The initial value of this type field is an empty string `""`.

### `number()`

The `number()` function defines that a field has a number value.

```typescript
import * as b from 'basil-odm';

const counters = b.collection({
  collectionName: 'counters',
  fields: {
    _id: b.objectId(),
    count: b.number(),
  }
});
```

The initial value of this type field is `0`.

### `boolean()`

The `boolean()` function defines that a field has a boolean value.

```typescript
import * as b from 'basil-odm';

const flags = b.collection({
  collectionName: 'flags',
  fields: {
    _id: b.objectId(),
    flag: b.boolean(),
  }
});
```

The initial value of this type field is `false`.

### `enum()`

The `enum()` function defines that the field is an enumerated type.

```typescript
import * as b from 'basil-odm';

const users = b.collection({
  collectionName: 'userRoles',
  fields: {
    _id: b.objectId(),
    name: b.string(),
    
    // This will be `0 | 1 | 2` type
    role: b.enum({
      name: 'UserRole',
      values: {
        member: 0,
        admin: 1,
        superAdmin: 2,
      },
    }),
  }
});
```
   
Arguments:

 - `name`: `string`\
   Name to refer to the enum values. `optional`
   
 - `values`: `Record<string, string | number | boolean>`\
   Values and names to define. The object's property name is used to refer to its value.

The initial value of this type field is the first value of the object passed to `values:`.

### `date()`

The `date()` function defines that the field is `Date` type.

```typescript
import * as b from 'basil-odm';

const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
    createdAt: b.date(),
  }
});
```

The initial value of this type field is `new Date()`.

### `literal()`

The `literal()` function defines that the field is [literal type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).

```typescript
import * as b from 'basil-odm';

const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
    
    // This will be "reserved" literal type
    reserved: b.literal("reserved"),
  }
});
```
The arguments that can be passed to the `literal()` function are either `number`, `string`, `null`, or `boolean`.

The initial value of this type field is passed literal value.

### `nullable()`

The `nullable()` function defines a field of type `null` or `undefined` or passed type.

```typescript
import * as b from 'basil-odm';

const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
    
    // This will be `null | undefined | string` type
    text: b.nullable(b.string()),
  }
});
```

The initial value of this type field is `null`.

### `record()`

The record() function defines a record of the passed type.

```typescript
import * as b from 'basil-odm';

const notes = b.collection({
  collectionName: 'dailyNotes',
  fields: {
    _id: b.objectId(),
    
    // This will be Record<string, number> type
    attrs: b.record(b.number())
  }
});
```

The initial value of this type field is empty object.

### `shape()`

The `shape()` function defines a field of object type with the specified field.

```typescript
import * as b from 'basil-odm';

const users = b.collection({
  collectionName: 'users',
  fields: {
    _id: b.objectId(),
    
    // This will be {city: string; street: string;} type
    address: b.shape({
      city: b.string(),
      street: b.string(),
    }),
  }
});
```

The initial value of this type field is an object with the initial values of several specified properties. For example, in the case of `b.shape({name: b.string()})`, `{name: ''}` is the initial value.

### `arrayOf()`

The `arrayOf()` function defines the fields of an array of the passed type.

```typescript
import * as b from 'basil-odm';

const groups = b.collection({
  collectionName: 'groups',
  fields: {
    _id: b.objectId(),

    // This will be `ObjectId[]` type
    memberIds: b.arrayOf(b.objectId())
  }
});
```

The initial value of this type field is an empty array `[]`.

### `union()`

The `union()` function defines a field of type union that consists of multiple types.

```typescript
const docs = b.collection({
  collectionName: 'docs',
  fields: {
    _id: b.objectId(),
    
    // This will be `number | string` type
    payload: b.union(b.number(), b.string())
  }
});
```

The initial value of this type field will be the initial value of the first type passed. For example, in the case of `b.union(b.number(), b.string())`, `0` is the initial value.

### `index()`

The `index()` function defines what index to have on the collection.

```typescript
import * as b from 'basil-odm';

const users = b.collection({
  collectionName: 'users',
  fields: {
    _id: b.objectId(),
    name: b.string(),
    email: b.string(),
    createdAt: b.date(),
  },
  indexes: [
    b.index({email: 1}, {unique: true}),
    b.index({createdAt: -1}),
  ]
});
```

Arguments:

 - `fields`: `Record<string, 1 | -1>`
   Describe which fields to define indexes on. Ascending and descending order is defined by `1` and `-1` respectively. To create a composite index, specify multiple fields. Example: `index({a: 1, b: 1, c: 1})`
 - `options?`:
   - `unique`: `boolean` If `true` is specified, [Unique Index](https://www.mongodb.com/docs/manual/core/index-unique/unique) will be set.
   - `background`: `boolean` If `true` is specified, creates the index in the background, yielding whenever possible.
   - `sparse`: `boolean` If `true` is specified, [Sparse index](https://www.mongodb.com/docs/manual/core/index-sparse/) will be set.
   - See the [`CreateIndexesOptions` documentation](https://mongodb.github.io/node-mongodb-native/5.7/interfaces/CreateIndexesOptions.html) for other options.
   

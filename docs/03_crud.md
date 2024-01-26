# Operations with generated models

This page explains how to use generated models to access the database and perform various operations.

It is assumed that you have already generated models. See [Define your schema](./02_schema.md) for how to generate models from your schema.

## Basics

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
    b.index({ email: 1 }, { unique: true }),
  ]
});
```

Generating code from this schema results in the following model(In actuality, it generates a more complex code, but we present simple code here for illustrative purposes).

`basil-gen.ts`

```typescript
import * as basil from 'basil-odm';

export class User extends basil.Base {
  _id: ObjectId = new Object();
  name: string = '';
  email: string = '';
  createdAt: Date = new Date();
}

export default {
  users: new basil.BasilCollection({
    // ...
  }),
};
```

This generated code export a `User` class and a `users` collection. These classes and objects are used to access the database.

## Create

You can create an entity of a collection by instantiating the `User` class.

```typescript
import { User } from './basil-gen'; // import generated models

const user = new User();
user.name = "John Doe";
user.email = "johndoe@example.com";
```

The constructor of an entity accepts a partial of that entity. This may be used to initialize properties one at a time.

```typescript
import { User } from './basil-gen'; // import generated models

const user = new User({
  name: 'John Doe',
  email: 'johndoe@example.com'
});
```

## Insert

To make the created entities persistent, insert data into the collection using the `insertOne()` method.

```typescript
import db, { User } from './basil-gen'; // import generated models

(async () => {
  const user = new User({
    name: 'John Doe',
    email: 'johndoe@example.com'
  });

  await db.users.insertOne(user);
})();
```

## Find and save

Entities can be retrieved by using the `findOne()` method, for example. To update an entity already in the collection, you can use the `save()` method.

```typescript
import db, { User } from './basil-gen'; // import generated models

(async () => {
  const user = await db.users.findOne({
    email: 'johndoe@example.com',
  });
  
  user.name = "@johndoe";

  await db.users.save(user);
})();
```

## Transaction

You can perform multiple operations in a transaction. The transaction is started by calling the `transaction()` method. If an error occurs during the transaction, the transaction is rolled back.

```typescript
import db, { User } from './basil-gen'; // import generated models
import { basil } from 'basil-odm';

(async () => {
  await basil.transaction({}, (session) => {
    db.users.insertOne(new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
    }), { session }); // pass session to run in this transaction
  });
})();
```

> NOTE: Be sure to pass the `session` object passed to each operation as an argument when performing operations in a transaction.

See [`Basil` class reference](./api/classes/Basil.md#transaction) for `transaction()` method details.

See [Transactions](https://docs.mongodb.com/manual/core/transactions/) for details on MongoDB transactions.

## Other operations


To find the available methods, see [`BasilCollection` class reference](./api/classes/BasilCollection.md).

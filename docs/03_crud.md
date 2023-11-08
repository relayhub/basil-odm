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
```

You can access the `users` collection in MongoDB through this `User` class.

## Create

You can also create an entity of a collection by instantiating the `User` class.

```typescript
import { User } from './basil-gen'; // import generated models

const user = new User();
user.name = "Kubota Mitsunori";
user.email = "anatoo.jp@gmail.com";
```

The constructor of an entity accepts a partial of that entity. This may be used to initialize properties one at a time.

```typescript
import { User } from './basil-gen'; // import generated models

const user = new User({
  name: 'Kubota Mitsunori',
  email: 'anatoo.jp@gmail.com'
});
```

## Insert

To make the created entities persistent, insert data into the collection using the `insertOne()` method.

```typescript
import { User } from './basil-gen'; // import generated models

(async () => {
  const user = new User({
    name: 'Kubota Mitsunori',
    email: 'anatoo.jp@gmail.com'
  });

  await User.insertOne(user);
})();
```

## Find and save

Entities can be retrieved by using the `findOne()` method, for example. To update an entity already in the collection, you can use the `save()` method.

```typescript
import { User } from './basil-gen'; // import generated models

(async () => {
  const user = await User.findOne({
    email: 'anatoo.jp@gmail.com',
  });
  
  user.name = "@anatoo";

  await User.save(user);
})();
```

## Other operations

To find the available methods, see [`Base` class reference](./api/classes/Base.md).

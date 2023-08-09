# Manage connections

## Setup for connection

To connect to MongoDB, remember to place a configuration file in the directory where package.json is located. The name of the configuration file is `basil.config.cjs` (note that the extension is not `.js`).

`basi.config.cjs`
```javascript
module.exports = {
  database: 'mydb',
  connectionUri: 'mongodb://localhost:27017'
};
```

To configure without placing a configuration file, call the `configure()` method.

```typescript
import {configure} from 'basil-odm';

configure({
  databaseName: 'mydb',
  connectionUri: 'mongodb://localhost:27017',
  clientOptions: {},
});
```

## Connect to MongoDB

No need to explicitly call a function for the connection. The connection is automatically made when you execute a query using the generated model.

## Retrieve the MongoClient instance

 To get a [MongoClient](https://mongodb.github.io/node-mongodb-native/5.7/classes/MongoClient.html) instance, refer to the `basil.client` property.

```typescript
import {basil} from 'basil-odm';

const mongoClient = basil.client;
```

## Disconnect

When terminating an application, you must explicitly call `disconnect()` function.

```typescript
import {disconnect} from 'basil-odm';

disconnect().then(() => {
  console.log("close");
});
```

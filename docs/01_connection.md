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

To configure without placing a configuration file, call the `basil.configure()` method.

```typescript
import {Basil} from 'basil-odm';

const basil = Basil.getInstance();
basil.configure({
  databaseName: 'db',
  connectionUri: 'mongodb://localhost:27017',
  clientOptions: {},
});
```

## Connect to MongoDB

No need to explicitly call a function for the connection. The connection is automatically made when you execute a query using the generated model.

## Retrieve the MongoClient instance

 To get a [MongoClient](https://mongodb.github.io/node-mongodb-native/5.7/classes/MongoClient.html) instance, refer to the `basil.client` property.

```typescript
import {Basil} from 'basil-odm';

const mongoClient = Basil.getInstance().client;
```

## Disconnect

When terminating an application, you must explicitly call `basil.close()` function.

```typescript
import {Basil} from 'basil-odm';

Basil.getInstance().close().then(() => {
  console.log("close");
});
```

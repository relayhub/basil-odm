import invariant from 'tiny-invariant';
import { BasilSettings } from './types';

const findConfig = require('find-config');
const { validate } = require('jsonschema');

/*
Example config file:
```
// basil.config.js
module.exports = {
  connectionUri: 'mongodb://12.7.0.0.1:27017',
  database: 'foobar',
};
```
 */

type Config = {
  connectionUri: string;
  database: string;
  mongoClientOptions?: object;
};

export function validateConfig(config: unknown): asserts config is Config {
  validate(
    config,
    {
      type: 'object',
      properties: {
        connectionUri: { type: 'string' },
        database: { type: 'string' },
        mongoClientOptions: { type: 'object', additionalProperties: true },
      },
      additionalProperties: false,
      required: ['connectionUri', 'database'],
    },
    { throwError: true }
  );
}

export async function loadConfig(configPath: string = findConfig('basil.config.js')): Promise<BasilSettings> {
  invariant(configPath, 'Couldn\'t find "basil.config.js" file.');

  const config = require(configPath);
  validateConfig(config);

  return await createSettings(config, { configPath });
}

export async function createSettings(config: Config, { configPath }: { configPath: string }): Promise<BasilSettings> {
  return {
    connectionUri: config.connectionUri,
    databaseName: config.database,
    clientOptions: config.mongoClientOptions || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
}

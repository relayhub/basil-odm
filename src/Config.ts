import invariant from 'tiny-invariant';
import { BasilSettings } from './types';
import { validate } from 'jsonschema';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import findConfig from 'find-config';

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

export async function loadConfig(
  configPath: string = findConfig('basil.config.js'),
  {
    silent,
  }: {
    silent?: boolean;
  } = {}
): Promise<BasilSettings> {
  invariant(configPath, 'Couldn\'t find "basil.config.js" file.');

  if (!silent) {
    console.log('Load config file:', configPath);
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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

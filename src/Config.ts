import invariant from 'tiny-invariant';
import { ResolvedConfig } from './types';
import { validate } from 'jsonschema';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import findConfig from 'find-config';

/*
Example config file:
```
// basil.config.cjs
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
  configPath: string = findConfig('basil.config.cjs'),
  {
    silent,
  }: {
    silent?: boolean;
  } = {}
): Promise<ResolvedConfig> {
  invariant(configPath, 'Couldn\'t find "basil.config.cjs" file.');

  if (!silent) {
    console.log('Load config file:', configPath);
  }

  try {
    const config = await import(configPath);
    validateConfig(config.default);
    return createSettings(config.default);
  } catch (e) {
    console.log('Failed to load config file:', configPath);
    throw e;
  }
}

export function createSettings(config: Config): ResolvedConfig {
  return {
    connectionUri: config.connectionUri,
    databaseName: config.database,
    clientOptions: config.mongoClientOptions ?? {},
  };
}

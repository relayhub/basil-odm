import { createSettings, validateConfig } from './Config';

test('createParams()', async () => {
  const params = createSettings({
    connectionUri: '',
    database: 'foo',
  });
  expect(params.connectionUri).toBe('');
});

test('validateConfig()', () => {
  expect(() =>
    validateConfig({
      connection: '',
    })
  ).toThrowError();

  expect(() =>
    validateConfig({
      connectionUri: '',
      databaseName: '',
    })
  ).toThrowError();

  expect(
    validateConfig({
      connectionUri: 'mongodb://127.0.0.1:12702/',
      database: 'foo',
    })
  ).toBe(undefined);
});

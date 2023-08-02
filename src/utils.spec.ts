import { index, setJsonSchemaValidator } from './utils';
import * as mongodb from 'mongodb';

describe('index()', () => {
  it('should works normally', () => {
    expect(index({ id: -1 })).toEqual({ fields: { id: -1 }, options: {} });
  });
});

describe('setJsonSchemaValidator', () => {
  it('works normally', async () => {
    const db = {
      collection: jest.fn() as typeof mongodb.Db.prototype.collection,
      command: jest.fn() as typeof mongodb.Db.prototype.command,
      createCollection: jest.fn() as typeof mongodb.Db.prototype.createCollection,
      listCollections: jest.fn().mockReturnValue({
        toArray: () => Promise.resolve([]),
      }) as typeof mongodb.Db.prototype.listCollections,
    } as mongodb.Db;

    await setJsonSchemaValidator(db, 'foobar', { foo: 'bar' });

    expect(db.createCollection).toHaveBeenCalledWith('foobar', {
      validator: {
        $jsonSchema: { foo: 'bar' },
      },
    });
  });
});

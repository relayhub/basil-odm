import { index, setJsonSchemaValidator, ensureCollection } from './utils';
import * as mongodb from 'mongodb';

describe('index()', () => {
  it('should works normally', () => {
    expect(index({ id: -1 })).toEqual({ fields: { id: -1 }, options: {} });
  });
});

describe('setJsonSchemaValidator()', () => {
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

describe('ensureCollection()', () => {
  it('works normally', async () => {
    const collection = {
      createIndex: jest.fn().mockImplementation((fields, options) => Promise.resolve('result')) as typeof mongodb.Collection.prototype.createIndex,
    } as mongodb.Collection;

    const db = {
      collection: (() => collection) as typeof mongodb.Db.prototype.collection,
      command: jest.fn() as typeof mongodb.Db.prototype.command,
      createCollection: jest.fn() as typeof mongodb.Db.prototype.createCollection,
      listCollections: jest.fn().mockReturnValue({
        toArray: () => Promise.resolve([]),
      }) as typeof mongodb.Db.prototype.listCollections,
    } as mongodb.Db;

    await ensureCollection(db, 'foobar', {
      $jsonSchema: {},
      indexes: [index({ email: 1 }, { unique: true })],
    });

    expect(db.createCollection).toHaveBeenCalledWith('foobar', {
      validator: {
        $jsonSchema: {},
      },
    });
    expect(collection.createIndex).toHaveBeenCalledWith({ email: 1 }, { unique: true });
  });
});

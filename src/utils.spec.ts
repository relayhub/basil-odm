import { ensureCollection } from './utils';
import * as mongodb from 'mongodb';
import { index } from './schema/createIndex';

describe('ensureCollection()', () => {
  it('works normally', async () => {
    const mockCollection = {
      createIndex: jest
        .fn()
        .mockImplementation(() => Promise.resolve('result')) as mongodb.Collection['createIndex'],
    } as mongodb.Collection;

    const mockDb = {
      collection: (() => mockCollection) as mongodb.Db['collection'],
      command: jest.fn() as mongodb.Db['command'],
      createCollection: jest.fn() as mongodb.Db['createCollection'],
      listCollections: jest.fn().mockReturnValue({
        toArray: () => Promise.resolve([]),
      }) as mongodb.Db['listCollections'],
    } as mongodb.Db;

    await ensureCollection(mockDb, 'foobar', {
      jsonSchema: {},
      indexes: [index({ email: 1 }, { unique: true })],
      options: {
        capped: true,
      },
    });

    expect(mockDb.createCollection).toHaveBeenCalledWith('foobar', {
      validator: {
        $jsonSchema: {},
      },
      capped: true,
    });
    expect(mockCollection.createIndex).toHaveBeenCalledWith({ email: 1 }, { unique: true });
  });
});

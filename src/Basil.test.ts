import { Basil } from './Basil';
import { CollectionSchema, objectId, string } from './index';
import { ObjectId } from 'mongodb';

jest.setTimeout(15000);

const basil: Basil = new Basil();

beforeAll(async () => {
  const uri = process.env.MONGO_URL as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db',
    clientOptions: {},
  });
  await basil.connect();
});

afterAll(async () => {
  await basil.close();
});

describe('Basil', () => {
  test('useDatabase()', async () => {
    await basil.useDatabase((db) => {
      expect(typeof db.databaseName).toBe('string');
    });

    await basil.useDatabase(async (db) => {
      const col = db.collection('hoge');

      await col.insertMany([
        { _id: new ObjectId(), tag: 'apple' },
        { _id: new ObjectId(), tag: 'pineapple' },
        { _id: new ObjectId(), tag: 'pen' },
        { _id: new ObjectId(), tag: 'apple' },
      ]);

      expect(await col.countDocuments()).toBe(4);
      await col.deleteMany({});
    });
  });
});
import { basil } from './Basil';
import { ObjectId } from 'mongodb';

jest.setTimeout(15000);

beforeAll(async () => {
  const uri = process.env.MONGO_URI as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db',
    clientOptions: {},
  });
});

afterAll(async () => {
  await basil.disconnect();
});

describe('Basil', () => {
  describe('useDatabase()', () => {
    it('works normally', async () => {
      await basil.useDatabase((db) => {
        expect(typeof db.databaseName).toBe('string');
      });
    });
  });

  describe('transaction()', () => {
    it('should works normally', async () => {
      const col = await basil.getCollection('test');
      const doc = { _id: new ObjectId() };
      await basil.transaction({}, async (session) => {
        await col.insertOne(doc, { writeConcern: { w: 'majority' } });
      });
      const fetched = await col.findOne({ _id: doc._id });
      expect(fetched).not.toBe(null);
    });

    it('should rollback on abort', async () => {
      const col = await basil.getCollection('test');
      const doc = { _id: new ObjectId() };
      try {
        await basil.transaction({}, async (session) => {
          await col.insertOne(doc, { session });
          throw Error('abort');
        });
      } catch (e) {
        // do nothing
      }
      const fetched = await col.findOne({ _id: doc._id });
      expect(fetched).toBe(null);
    });
  });
});

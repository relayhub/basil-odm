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
    clientOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
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

  test('insertOne()', async () => {
    const Hoge = new CollectionSchema({
      collectionName: 'hoge-hoge',
      fields: {
        _id: objectId(),
        name: string(),
      },
    });
    const id = new ObjectId();

    await basil.insertOne(Hoge, {
      _id: id,
      name: 'Taro',
    });

    await basil.useDatabase(async (db) => {
      const col = db.collection(Hoge.collectionName);
      const document = await col.findOne({ _id: id }, {});
      expect(document?.name).toBe('Taro');
    });
  });

  test('aggregate()', async () => {
    const hoge = new CollectionSchema({
      collectionName: 'hoge',
    });

    await basil.useCollection(hoge, async (col) => {
      await col.insertMany([
        { _id: new ObjectId(), tag: 'apple' },
        { _id: new ObjectId(), tag: 'pineapple' },
        { _id: new ObjectId(), tag: 'pen' },
        { _id: new ObjectId(), tag: 'apple' },
      ]);
    });

    const result = await basil.aggregate<{ count: number }>(hoge, [
      {
        $count: 'count',
      },
    ]);

    expect(result[0].count).toBe(4);
    await basil.useCollection(hoge, async (collection) => {
      await collection.deleteMany({});
    });
  });

  test('deleteOne()', () =>
    basil.useDatabase(async (db) => {
      const hoge = new CollectionSchema({ collectionName: 'hoge' });

      const col = db.collection(hoge.collectionName);
      await col.insertOne({ name: 'hoge' });
      await col.insertOne({ name: 'fuga' });
      expect(await col.countDocuments()).toBe(2);
      await basil.deleteOne(hoge, { name: 'hoge' });
      expect(await col.countDocuments()).toBe(1);
    }));

  test.todo('insertOne()');
  test.todo('insertMany()');
  test.todo('updateOne()');
  test.todo('updateMany()');
});

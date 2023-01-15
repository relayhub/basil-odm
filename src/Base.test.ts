import { Basil } from './Basil';
import { createFieldsSchema, objectId, string } from './index';
import { ObjectId } from 'mongodb';
import { Base } from './Base';

jest.setTimeout(15000);

const basil = Basil.getInstance();

beforeAll(async () => {
  const uri = process.env.MONGO_URL as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db',
    clientOptions: {},
  });
  await basil.connect();
});
afterEach(async () => {
  const db = await basil.getDatabase();
  return Promise.all((await db.collections()).map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await basil.close();
});

class User extends Base {
  _id = new ObjectId();
  name = 'Mitsunori Kubota';

  static getCollection() {
    return {
      collectionName: 'users',
      indexes: [],
      schema: createFieldsSchema({
        _id: objectId,
        name: string,
      }),
    };
  }
}

describe('Base', () => {
  test('findById(), findOne()', async () => {
    const user = new User();
    expect(await User.findById(user._id)).toBe(null);

    await User.insertOne(user);

    {
      const result = await User.findById(user._id);
      expect(result?.name).toBe(user.name);
      expect(result instanceof User).toBe(true);
    }

    {
      const result = await User.findOne({ _id: user._id });
      expect(result?.name).toBe(user.name);
      expect(result instanceof User).toBe(true);
    }
  });

  test('count()', async () => {
    expect(await User.count()).toBe(0);
    const user = new User();
    await User.insertOne(user);
    expect(await User.count()).toBe(1);
    await User.deleteOne({ _id: user._id });
    expect(await User.count()).toBe(0);
  });

  test.todo('findByIds()');
  test.todo('findMany()');
  test.todo('save()');
  test.todo('deleteMany()');
  test.todo('updateMany()');
  test.todo('updateOne()');
});

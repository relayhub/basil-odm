import { Basil } from './Basil';
import { createFieldsSchema, objectId, string } from './index';
import mongodb from 'mongodb';
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
  _id = new mongodb.ObjectId();
  name = 'Mitsunori Kubota';

  constructor(source?: Partial<User>) {
    super();
    Object.assign(this, source);
  }

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

  test('save()', async () => {
    const user = new User();
    await User.insertOne(user);
    user.name = 'John Doe';
    await User.save(user);
    const current = await User.findById(user._id);
    expect(current?.name).toBe('John Doe');
  });

  test('updateOne()', async () => {
    const user = new User();
    await User.insertOne(user);
    user.name = 'John Doe';
    await User.updateOne({ _id: user._id }, { $set: { name: user.name } });
    const current = await User.findById(user._id);
    expect(current?.name).toBe('John Doe');
  });

  test('updateMany()', async () => {
    await User.insertOne(new User());
    await User.insertOne(new User());
    await User.updateMany({}, { $set: { name: 'John Doe' } });
    const users = await User.findMany({});
    expect(users[0].name).toBe('John Doe');
    expect(users[1].name).toBe('John Doe');
  });

  test('findMany()', async () => {
    await User.insertOne(new User());
    await User.insertOne(new User());
    const users = await User.findMany({});
    expect(users.length).toBe(2);
  });

  test('findByIds()', async () => {
    const users = [new User(), new User(), new User()];
    const ids = users.map((user) => user._id);

    await User.insertOne(users[0]);
    await User.insertOne(users[1]);
    await User.insertOne(users[2]);

    expect((await User.findByIds([ids[0], ids[1]])).length).toBe(2);
  });

  test('findByIds() filter options', async () => {
    const users = [new User({ name: 'John Doe' }), new User(), new User()];
    const ids = users.map((user) => user._id);

    await User.insertOne(users[0]);
    await User.insertOne(users[1]);
    await User.insertOne(users[2]);

    expect((await User.findByIds([ids[0], ids[1]], { filter: { name: 'John Doe' } })).length).toBe(1);
  });

  test('deleteMany()', async () => {
    await User.insertOne(new User());
    await User.insertOne(new User());
    await User.insertOne(new User());

    expect(await User.count()).toBe(3);

    await User.deleteMany({});

    expect(await User.count()).toBe(0);
  });

  test('aggregate()', async () => {
    const user = new User();
    await User.insertOne(user);

    const result = (await User.aggregate([
      {
        $match: { name: 'Mitsunori Kubota' },
      },
    ])) as User[];

    expect(result[0]._id.toString()).toBe(user._id.toString());
  });

  test.todo('deleteMany()');
});

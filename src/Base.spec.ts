import { Basil } from './Basil';
import { createFieldsSchema, objectId, string } from './index';
import * as mongodb from 'mongodb';
import { Base } from './Base';

jest.setTimeout(15000);
const basil = Basil.getInstance();

beforeAll(async () => {
  const uri = process.env.MONGO_URI as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db',
    clientOptions: {},
  });
});

beforeEach(async () => {
  const db = await basil.getDatabase();
  return Promise.all((await db.collections()).map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await basil.disconnect();
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

class User2 extends Base {
  _id = '';
  name = 'Mitsunori Kubota';

  constructor(source?: Partial<User2>) {
    super();
    Object.assign(this, source);
  }

  static getCollection() {
    return {
      collectionName: 'users2',
      indexes: [],
      schema: createFieldsSchema({
        _id: string,
        name: string,
      }),
    };
  }
}

describe('Base', () => {
  describe('findById()', () => {
    it('should works normally', async () => {
      const user = new User();
      expect(await User.findById(user._id)).toBe(null);

      await User.insertOne(user);

      {
        const result = await User.findById(user._id);
        expect(result?.name).toBe(user.name);
        expect(result instanceof User).toBe(true);
      }
    });

    it('should works with string "_id"', async () => {
      const user = new User2({ _id: 'foobar' });
      expect(await User2.findById(user._id)).toBe(null);
      await User2.insertOne(user);
      expect(await User2.findById('foobar')).toBeTruthy();
    });
  });

  describe('findOne()', () => {
    it('should works normally', async () => {
      const user = new User();
      expect(await User.findById(user._id)).toBe(null);

      await User.insertOne(user);

      {
        const result = await User.findOne({ _id: user._id });
        expect(result?.name).toBe(user.name);
        expect(result instanceof User).toBe(true);
      }
    });
  });

  describe('count()', () => {
    it('should works normally', async () => {
      expect(await User.count()).toBe(0);
      const user = new User();
      await User.insertOne(user);
      expect(await User.count()).toBe(1);
      await User.deleteOne({ _id: user._id });
      expect(await User.count()).toBe(0);
    });
  });

  describe('save()', () => {
    it('should works normally', async () => {
      const user = new User();
      await User.insertOne(user);
      user.name = 'John Doe';
      await User.save(user);
      const current = await User.findById(user._id);
      expect(current?.name).toBe('John Doe');
    });
  });

  describe('updateOne()', () => {
    test('should works normally', async () => {
      const user = new User();
      await User.insertOne(user);
      user.name = 'John Doe';
      await User.updateOne({ _id: user._id }, { $set: { name: user.name } });
      const current = await User.findById(user._id);
      expect(current?.name).toBe('John Doe');
    });
  });

  describe('updateMany()', () => {
    it('should works normally', async () => {
      await User.insertOne(new User());
      await User.insertOne(new User());
      await User.updateMany({}, { $set: { name: 'John Doe' } });
      const users = await User.findMany({});
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('John Doe');
    });
  });

  describe('findMany()', () => {
    it('should works normally', async () => {
      await User.insertOne(new User());
      await User.insertOne(new User());
      const users = await User.findMany({});
      expect(users.length).toBe(2);
    });
  });

  describe('findByIds()', () => {
    it('should works normally', async () => {
      const users = [new User(), new User(), new User()];
      const ids = users.map((user) => user._id);

      await User.insertOne(users[0]);
      await User.insertOne(users[1]);
      await User.insertOne(users[2]);

      expect((await User.findByIds([ids[0], ids[1]])).length).toBe(2);
    });

    it('should works with filter options', async () => {
      const users = [new User({ name: 'John Doe' }), new User(), new User()];
      const ids = users.map((user) => user._id);

      await User.insertOne(users[0]);
      await User.insertOne(users[1]);
      await User.insertOne(users[2]);

      expect((await User.findByIds([ids[0], ids[1]], { filter: { name: 'John Doe' } })).length).toBe(1);
    });
  });

  describe('deleteMany()', () => {
    it('should works normally', async () => {
      await User.insertOne(new User());
      await User.insertOne(new User());
      await User.insertOne(new User());

      expect(await User.count()).toBe(3);

      await User.deleteMany({});

      expect(await User.count()).toBe(0);
    });
  });

  describe('aggregate()', () => {
    it('should works normally', async () => {
      const user = new User();
      await User.insertOne(user);

      const result = (await User.aggregate([
        {
          $match: { name: 'Mitsunori Kubota' },
        },
      ])) as User[];

      expect(result[0]._id.toString()).toBe(user._id.toString());
    });
  });
});
import { Basil } from './Basil';
import { createFieldsSchema, objectId, string, RuntimeCollectionSchema } from './index';
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

  static getRuntimeSchema() {
    return {
      collectionName: 'users',
      indexes: [],
      fields: createFieldsSchema({
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

  static getRuntimeSchema() {
    return {
      collectionName: 'users2',
      indexes: [],
      fields: createFieldsSchema({
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

  describe('loadEdges()', () => {
    class User extends Base {
      _id = new mongodb.ObjectId();

      groupId = new mongodb.ObjectId();

      constructor(source?: Partial<User>) {
        super();
        Object.assign(this, source);
      }

      static getRuntimeSchema(): RuntimeCollectionSchema<User, { group: Group }> {
        return {
          collectionName: 'users',
          indexes: [],
          fields: createFieldsSchema({
            _id: objectId,
            groupId: objectId,
          }),
          edges: {
            group: {
              type: 'hasOne' as const,
              collection: Group,
              referenceField: 'groupId' as const,
            },
          },
        };
      }
    }

    class Group extends Base {
      _id = new mongodb.ObjectId();

      constructor(source?: Partial<User>) {
        super();
        Object.assign(this, source);
      }

      static getRuntimeSchema() {
        return {
          collectionName: 'groups',
          indexes: [],
          fields: createFieldsSchema({
            _id: objectId,
          }),
        };
      }
    }

    it('should works normally', async () => {
      const group = new Group();
      await Group.insertOne(group);

      const user = new User();
      user.groupId = group._id;
      await User.insertOne(user);

      const [loaded] = await User.loadEdges([user], { group: true });
      expect(loaded.group._id.equals(group._id)).toBe(true);
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

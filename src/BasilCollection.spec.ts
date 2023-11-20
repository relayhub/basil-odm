import { Basil } from './Basil';
import { createFieldsSchema, objectId, string, RuntimeCollectionSchema } from './index';
import * as mongodb from 'mongodb';
import { Base } from './Base';
import { ObjectId } from 'mongodb';
import { BasilCollection } from './BasilCollection';

jest.setTimeout(15000);
const basil = Basil.getInstance();

beforeAll(async () => {
  const uri = process.env.MONGO_URI as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db-basil-collection-tests',
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

class User {
  _id = new ObjectId();
  name = 'Mitsunori Kubota';

  constructor(source?: Partial<User>) {
    Object.assign(this, source);
  }
}

class User2 {
  _id = '';
  name = 'Mitsunori Kubota';

  constructor(source?: Partial<User2>) {
    Object.assign(this, source);
  }
}

const userSchema: RuntimeCollectionSchema<{ _id: ObjectId; name: string }, object> = {
  collectionName: 'users',
  indexes: [],
  Entity: User,
  fields: createFieldsSchema({
    _id: objectId,
    name: string,
  }),
};

const user2Schema: RuntimeCollectionSchema<{ _id: string; name: string }, object> = {
  collectionName: 'users2',
  indexes: [],
  Entity: User2,
  fields: createFieldsSchema({
    _id: string,
    name: string,
  }),
};

describe('BasilCollection', () => {
  describe('findById()', () => {
    it('should works normally', async () => {
      const user = new User({
        _id: new ObjectId(),
        name: 'Mitsunori Kubota',
      });
      const Users = new BasilCollection(() => userSchema);
      expect(await Users.findById(user._id)).toBe(null);
      await Users.insertOne(user);

      {
        const result = await Users.findById(user._id);
        expect(result?.name).toBe(user.name);
        expect(result?._id).toBeTruthy();
        expect(result instanceof User).toBe(true);
      }
    });

    it('should works with string "_id"', async () => {
      const user = new User2({ _id: 'foobar' });
      const Users = new BasilCollection(() => user2Schema);
      expect(await Users.findById(user._id)).toBe(null);
      await Users.insertOne(user);
      expect(await Users.findById('foobar')).toBeTruthy();
    });
  });

  describe('findOne()', () => {
    it('should works normally', async () => {
      const user = new User();
      const Users = new BasilCollection(() => userSchema);
      expect(await Users.findById(user._id)).toBe(null);

      await Users.insertOne(user);

      {
        const result = await Users.findOne({ _id: user._id });
        expect(result?.name).toBe(user.name);
        //expect(result instanceof User).toBe(true);
      }
    });
  });

  describe('count()', () => {
    it('should works normally', async () => {
      const Users = new BasilCollection(() => userSchema);
      expect(await Users.count()).toBe(0);
      const user = new User();
      await Users.insertOne(user);
      expect(await Users.count()).toBe(1);
      await Users.deleteOne({ _id: user._id });
      expect(await Users.count()).toBe(0);
    });
  });

  describe('save()', () => {
    it('should works normally', async () => {
      const user = new User();
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(user);
      user.name = 'John Doe';
      await Users.save(user);
      const current = await Users.findById(user._id);
      expect(current?.name).toBe('John Doe');
    });
  });

  describe('updateOne()', () => {
    test('should works normally', async () => {
      const user = new User();
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(user);
      user.name = 'John Doe';
      await Users.updateOne({ _id: user._id }, { $set: { name: user.name } });
      const current = await Users.findById(user._id);
      expect(current?.name).toBe('John Doe');
    });
  });

  describe('updateMany()', () => {
    it('should works normally', async () => {
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(new User());
      await Users.insertOne(new User());
      await Users.updateMany({}, { $set: { name: 'John Doe' } });

      const users = await Users.findMany({});
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('John Doe');
    });
  });

  describe('findMany()', () => {
    it('should works normally', async () => {
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(new User());
      await Users.insertOne(new User());

      const users = await Users.findMany({});
      expect(users.length).toBe(2);
    });
  });

  describe('loadEdges()', () => {
    class Group extends Base {
      _id = new mongodb.ObjectId();

      constructor(source?: Partial<User>) {
        super();
        Object.assign(this, source);
      }
    }

    const Groups: BasilCollection<Group, { users: User[] }> = new BasilCollection(() => ({
      collectionName: 'groups',
      indexes: [],
      Entity: Group,
      fields: createFieldsSchema({
        _id: objectId,
      }),
      edges: {
        users: {
          type: 'hasMany' as const,
          collection: Users,
          referenceField: 'groupId',
        },
      },
    }));
    class User extends Base {
      _id = new mongodb.ObjectId();

      groupId = new mongodb.ObjectId();

      constructor(source?: Partial<User>) {
        super();
        Object.assign(this, source);
      }
    }

    const Users: BasilCollection<User, { group: Group }> = new BasilCollection(() => ({
      collectionName: 'users',
      indexes: [],
      Entity: User,
      fields: createFieldsSchema({
        _id: objectId,
        groupId: objectId,
      }),
      edges: {
        group: {
          type: 'hasOne' as const,
          collection: Groups,
          referenceField: 'groupId' as const,
        },
      },
    }));

    it('should works normally for hasOne() edge', async () => {
      const group = new Group();
      await Groups.insertOne(group);

      const user = new User();
      user.groupId = group._id;
      await Users.insertOne(user);

      const [loaded] = await Users._loadEdges([user], { edges: { group: true } });
      expect(loaded.group._id.equals(group._id)).toBe(true);

      expect(async () => {
        // type check
        await Users._loadEdges([], { edges: {} });
        await Users._loadEdges([], { edges: { group: true } });

        // @ts-expect-error invalid edge key "foobar"
        await Users._loadEdges([], { edges: { foobar: true } });
      }).toBeTruthy();
    });

    it('should works normally for hasMany() edge', async () => {
      const group = new Group();
      await Groups.insertOne(group);

      const user = new User();
      user.groupId = group._id;
      await Users.insertOne(user, {
        writeConcern: { w: 'majority' },
      });

      const [loaded] = await Groups._loadEdges([group], { edges: { users: true } });
      expect(typeof loaded.users.length).toBe('number');
    });

    it('should works normally for hasMany() edge and limit option', async () => {
      const group = new Group();
      await Groups.insertOne(group);

      for (let i = 0; i < 20; i++) {
        const user = new User();
        user.groupId = group._id;
        await Users.insertOne(user, {
          writeConcern: { w: 'majority' },
        });
      }

      const [loaded] = await Groups._loadEdges([group], {
        edges: {
          users: { limit: 10 },
        },
      });
      expect(loaded.users.length).toBe(10);
    });

    it('should works for findById() with edges options', async () => {
      const group = new Group();
      await Groups.insertOne(group, {
        writeConcern: { w: 'majority' },
      });

      const user = new User();
      user.groupId = group._id;
      await Users.insertOne(user, {
        writeConcern: { w: 'majority' },
      });

      const loadedGroup = await Groups.findById(group._id, { edges: { users: true } });
      expect(typeof loadedGroup?.users.length).toBe('number');
    });
  });

  describe('findByIds()', () => {
    it('should works normally', async () => {
      const users = [new User(), new User(), new User()];
      const ids = users.map((user) => user._id);
      const Users = new BasilCollection(() => userSchema);

      await Users.insertOne(users[0]);
      await Users.insertOne(users[1]);
      await Users.insertOne(users[2]);

      expect((await Users.findByIds([ids[0], ids[1]])).length).toBe(2);
    });

    it('should works with filter options', async () => {
      const users = [new User({ name: 'John Doe' }), new User(), new User()];
      const ids = users.map((user) => user._id);
      const Users = new BasilCollection(() => userSchema);

      await Users.insertOne(users[0]);
      await Users.insertOne(users[1]);
      await Users.insertOne(users[2]);

      expect((await Users.findByIds([ids[0], ids[1]], { filter: { name: 'John Doe' } })).length).toBe(1);
    });
  });

  describe('deleteMany()', () => {
    it('should works normally', async () => {
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(new User());
      await Users.insertOne(new User());
      await Users.insertOne(new User());

      expect(await Users.count()).toBe(3);

      await Users.deleteMany({});

      expect(await Users.count()).toBe(0);
    });
  });

  describe('aggregate()', () => {
    it('should works normally', async () => {
      const user = new User();
      const Users = new BasilCollection(() => userSchema);
      await Users.insertOne(user);

      const result = (await Users.aggregate([
        {
          $match: { name: 'Mitsunori Kubota' },
        },
      ])) as User[];

      expect(result[0]._id.toString()).toBe(user._id.toString());
    });
  });
});

import db, { BlogEntry, User, UserStatus } from './basil-gen';
import { Basil } from '../../src';

jest.setTimeout(15000);
const basil = Basil.getInstance();

beforeAll(async () => {
  const uri = process.env.MONGO_URI as string;

  basil.configure({
    connectionUri: uri,
    databaseName: 'db-e2e-01',
    clientOptions: {},
  });
});

afterAll(async () => {
  await basil.disconnect();
});

describe('e2e/01', () => {
  it('should works normally', async () => {
    const user = new User();
    await db.users.insertOne(user, {
      writeConcern: { w: 'majority' },
    });

    const blogEntry = new BlogEntry({
      userId: user._id,
    });
    await db.blogEntries.insertOne(blogEntry, {
      writeConcern: { w: 'majority' },
    });

    expect(await db.users.findById(user._id)).toBeTruthy();
    expect(await db.blogEntries.findById(blogEntry._id)).toBeTruthy();
  });

  it('should exports collection accessor objects as default export', () => {
    expect(db).toBeTruthy();
    expect(db.users).toBeTruthy();
    expect(db.blogEntries).toBeTruthy();
  });

  it('should exports enums', () => {
    expect(UserStatus).toBeTruthy();
    expect(UserStatus.ACTIVE).toBeTruthy();
    expect(UserStatus.INACTIVE).toBeTruthy();

    // type check
    const _ = () => {
      const _status0: UserStatus = 'active';
      const _status1: UserStatus = 'inactive';
    };
  });

  describe('collection accessor objects', () => {
    it('should works normally', async () => {
      const count = await db.users.count();
      expect(typeof count).toBe('number');

      const user = new User();
      await db.users.insertOne(user, {
        writeConcern: { w: 'majority' },
      });

      const fetchedUser = await db.users.findById(user._id);
      expect(user._id.equals(fetchedUser?._id)).toBe(true);
    });

    it('should works with edge loading', async () => {
      const user = new User();
      const blogEntry = new BlogEntry({
        userId: user._id,
      });

      await db.blogEntries.insertOne(blogEntry, {
        writeConcern: { w: 'majority' },
      });

      const [loaded] = await db.users._loadEdges([user], { edges: { blogEntries: true } });
      expect(loaded.blogEntries).toBeTruthy();
    });

    describe('findMany()', () => {
      it('should works with edge loading', async () => {
        const user = new User();
        const blogEntry = new BlogEntry({
          userId: user._id,
        });

        await db.users.insertOne(user, {
          writeConcern: { w: 'majority' },
        });
        await db.blogEntries.insertOne(blogEntry, {
          writeConcern: { w: 'majority' },
        });

        const users = await db.users.findMany({ _id: user._id }, { edges: { blogEntries: true } });
        expect(blogEntry._id.equals(users[0].blogEntries[0]._id)).toBe(true);
      });
    });

    describe('findByIds()', () => {
      it('should works with edge loading', async () => {
        const user = new User();
        const blogEntry = new BlogEntry({
          userId: user._id,
        });

        await db.users.insertOne(user, {
          writeConcern: { w: 'majority' },
        });
        await db.blogEntries.insertOne(blogEntry, {
          writeConcern: { w: 'majority' },
        });

        const users = await db.users.findByIds([user._id], { edges: { blogEntries: true } });
        expect(blogEntry._id.equals(users[0].blogEntries[0]._id)).toBe(true);
      });
    });

    describe('findOne()', () => {
      it('should works with edge loading', async () => {
        const user = new User();
        const blogEntry = new BlogEntry({
          userId: user._id,
        });

        await db.users.insertOne(user, {
          writeConcern: { w: 'majority' },
        });
        await db.blogEntries.insertOne(blogEntry, {
          writeConcern: { w: 'majority' },
        });

        const loaded = await db.users.findOne({ _id: user._id }, { edges: { blogEntries: true } });
        expect(blogEntry._id.equals(loaded?.blogEntries[0]._id)).toBe(true);
      });
    });
  });
});

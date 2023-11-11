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
    await User.insertOne(user, {
      writeConcern: { w: 'majority' },
    });

    const blogEntry = new BlogEntry({
      userId: user._id,
    });
    await BlogEntry.insertOne(blogEntry, {
      writeConcern: { w: 'majority' },
    });

    const [loaded] = await BlogEntry.loadEdges([blogEntry], {
      user: true,
    });
    expect(loaded.user).toBeTruthy();
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
  });
});

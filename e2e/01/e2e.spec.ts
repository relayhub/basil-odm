import { BlogEntry, User } from './basil-gen';
import { Basil } from '../../src';

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

afterAll(async () => {
  await basil.disconnect();
});

describe('e2e/01', () => {
  it('should works normally', async () => {
    const user = new User();
    await User.insertOne(user);
    const blogEntry = new BlogEntry({
      userId: user._id,
    });
    await BlogEntry.insertOne(blogEntry);
    const [loaded] = await BlogEntry.loadEdges([blogEntry], {
      user: true,
    });
    expect(loaded.user).toBeTruthy();
  });
});

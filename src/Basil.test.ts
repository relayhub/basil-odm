import { basil } from './Basil';

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
});

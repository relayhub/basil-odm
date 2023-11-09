import { MongoMemoryReplSet } from 'mongodb-memory-server';

export = async function globalTeardown() {
  const instance = (global as unknown as { __MONGOINSTANCE: MongoMemoryReplSet }).__MONGOINSTANCE;
  await instance.stop();
};

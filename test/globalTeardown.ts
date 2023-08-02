import { MongoMemoryReplSet } from 'mongodb-memory-server';

export = async function globalTeardown() {
  const instance = (global as any).__MONGOINSTANCE as MongoMemoryReplSet;
  await instance.stop();
};

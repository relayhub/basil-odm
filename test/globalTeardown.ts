import { MongoMemoryServer } from 'mongodb-memory-server';

export = async function globalTeardown() {
  const instance = (global as any).__MONGOINSTANCE as MongoMemoryServer;
  await instance.stop();
};

import { MongoMemoryServer } from 'mongodb-memory-server';

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.3',
    },
    instance: {},
  });
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
};

import { MongoMemoryReplSet } from 'mongodb-memory-server';

export = async function globalSetup() {
  const replset = await MongoMemoryReplSet.create({
    binary: {
      version: '6.0.3',
    },
    replSet: { count: 4 },
  });
  const uri = replset.getUri();
  Object.assign(global, {
    __MONGOINSTANCE: replset,
  });
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
};

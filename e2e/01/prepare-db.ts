import { prepareDb, disconnect } from '../../src';
import * as schema from './schema';

const prepare = async () => {
  await prepareDb(schema);
  await disconnect();
};

prepare().catch(console.log);

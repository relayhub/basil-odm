import { generateCode } from '../../src';
import { join } from 'path';
import * as schema from './schema';

generateCode({
  schema,
  outputFile: join(__dirname, 'basil-gen.ts'),
  importSource: '../../src',
});

import * as pack from '../package.json';
import { program } from 'commander';
import { loadConfig } from './Config';
import { inspect } from 'util';
import { resolve } from 'path';
import { generateCode } from './generator/codeGenerator';
import { CollectionDef, collectionDefSymbol } from './types';
import { prepareDb } from './utils';
import { disconnect } from './Basil';

program.name('Basil CLI').option('--config <path>', 'specify config file name', 'basil.config.cjs').version(pack.version, '-v, --version');

program
  .command('prepare-db')
  .description('Prepare database from your schema')
  .option('--schema <path>', 'specify schema file name')
  .action(async (options) => {
    const importedSchema = await loadSchemaFile(options);
    const schema = parseSchema(importedSchema);
    const config = await loadConfig(resolve(program.opts().config));

    console.log('Loaded config:');
    console.log(inspect(config));

    await prepareDb(schema, config);
    await disconnect();
  });

program
  .command('gen')
  .description('Generate code from your schema')
  .option('--schema <path>', 'specify schema file name')
  .option('--output <path>', 'specify output file name')
  .option('--import-source <source>', 'specify the path to load instead of the basil package in the generated code. default: basil')
  .action(async (options) => {
    const imported = await loadSchemaFile(options);
    const schema = parseSchema(imported);

    if (Object.keys(schema).length === 0) {
      throw Error('No collection definition found in schema file.');
    }

    generateCode({
      schema,
      outputFile: options.output,
      importSource: options.importSource,
    });
  });

function parseSchema(imported: Record<string, unknown>): Record<string, CollectionDef> {
  const schema: Record<string, CollectionDef> = {};
  for (const [key, value] of Object.entries(imported)) {
    if (typeof value !== 'object' || value === null) {
      continue;
    }

    if ((value as CollectionDef)[collectionDefSymbol]) {
      schema[key] = value as CollectionDef;
    }
  }

  return schema;
}

async function loadSchemaFile(options: { schema?: string }): Promise<Record<string, unknown>> {
  if (typeof options.schema !== 'string') {
    throw Error('Schema file name is required. Pass --schema <path> option.');
  }

  const path = resolve(options.schema);
  const schema = await import(path);

  if (schema === null) {
    throw Error(`Failed to load schema: ${JSON.stringify(options.schema)}`);
  }

  return schema;
}

export { program };

if (require.main === module) {
  program.parse();
}

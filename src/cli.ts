import * as pack from '../package.json';
import { program } from 'commander';
import { loadConfig } from './Config';
import * as util from 'util';

const header = `Basil ODM v${pack.version}
`;

program.name('Basil ODM').option('--config <path>', 'specify config file name', 'basil.config.js').version(pack.version, '-v, --version');

program
  .command('dump-config')
  .description('Dump config file')
  .action(async () => {
    console.log(header);
    console.log('Try to load config file:', program.opts().config);
    const config = await loadConfig();
    console.log(util.inspect(config));
  });

program
  .command('prepare-db')
  .description('Prepare database from your schema')
  .action(() => {
    // TODO
    console.log('run hoge command');
  });

program.parse();

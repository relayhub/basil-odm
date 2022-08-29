import {Collection} from '../src/Collection';
import {Schema} from '../src/schema/Schema';

export const ExampleRepository = new Collection(() => {
  return {
    name: 'examples',
    schema: new Schema({}),
    indexes: []
  };
});


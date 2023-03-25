import { createFieldsSchema as s } from './FieldsSchema';
import { record } from './record';
import { string } from './string';

test('record()', () => {
  const schema = s({
    dict: record(string),
  });

  expect(schema.decode({ dict: { a: 'a', b: 'b' } })).toEqual({
    dict: {
      a: 'a',
      b: 'b',
    },
  });
});

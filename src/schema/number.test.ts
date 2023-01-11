import { createFieldsSchema as s } from './FieldsSchema';
import { number } from './number';

test('number', () => {
  const schema = s({
    count: number,
  });

  expect(schema.decode({ count: 3 })).toEqual({ count: 3 });
});

test('number()', () => {
  const schema = s({
    count: number(),
  });

  expect(schema.decode({ count: 3 })).toEqual({ count: 3 });
});

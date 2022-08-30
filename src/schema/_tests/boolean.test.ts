import {createFieldsSchema as s} from '../FieldsSchema';
import {boolean} from '../boolean';

test('boolean', () => {
  const schema = s({
    flag: boolean,
  });

  expect(schema.decode({flag: true})).toEqual({flag: true});

  expect(() => schema.decode({})).toThrowError();
});

test('boolean()', () => {
  const schema = s({
    flag: boolean(),
  });

  expect(schema.decode({flag: false})).toEqual({flag: false});
});

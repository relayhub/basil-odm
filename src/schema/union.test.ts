import { createFieldsSchema } from './FieldsSchema';
import { union } from './union';
import { literal } from './literal';

test('Union', () => {
  const schema = createFieldsSchema({
    type: union(literal('foo'), literal('bar')),
  });

  expect(schema.decode({ type: 'bar' })).toEqual({ type: 'bar' });
  expect(() => schema.decode({ type: 'foobar' })).toThrow(Error);

  expect(schema.encode({ type: 'bar' })).toEqual({ type: 'bar' });
  expect(() => schema.encode({ type: 'foobar' })).toThrow(Error);

  expect(schema.generateBsonSchema()).toEqual({
    bsonType: 'object',
    required: ['type'],
    properties: {
      type: {
        anyOf: [{ enum: ['foo'] }, { enum: ['bar'] }],
      },
    },
    additionalProperties: false,
  });
});

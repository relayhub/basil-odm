import { createFieldsSchema as s } from './FieldsSchema';
import { objectId } from './objectId';
import mongodb from 'mongodb';

const { ObjectId } = mongodb;

test('objectId', () => {
  const schema = s({
    id: objectId,
  });

  expect(schema.decode({ id: new ObjectId('000000000000') })).toEqual({
    id: new ObjectId('000000000000'),
  });
});

test('objectId()', () => {
  const schema = s({
    id: objectId(),
  });

  expect(schema.decode({ id: new ObjectId('000000000000') })).toEqual({
    id: new ObjectId('000000000000'),
  });
});

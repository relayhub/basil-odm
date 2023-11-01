import { createFieldsSchema as s } from './FieldsSchema';
import { objectId } from './objectId';
import { ObjectId } from 'mongodb';

test('objectId', () => {
  const schema = s({
    id: objectId,
  });

  expect(schema.decode({ id: new ObjectId('00000000e4da394bb9e3efdb') })).toEqual({
    id: new ObjectId('00000000e4da394bb9e3efdb'),
  });
});

test('objectId()', () => {
  const schema = s({
    id: objectId(),
  });

  expect(schema.decode({ id: new ObjectId('00000000e4da394bb9e3efdc') })).toEqual({
    id: new ObjectId('00000000e4da394bb9e3efdc'),
  });
});

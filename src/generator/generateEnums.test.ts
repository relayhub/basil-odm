import { enums } from '../schema/enums';
import { generateEnumsCode } from './codeGenerator';
import { CollectionSchema } from '../schema/CollectionSchema';
import { objectId } from '../schema/objectId';

describe('generateEnums()', () => {
  test('normal', () => {
    const collection = new CollectionSchema({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: enums({
          name: 'UserType',
          values: ['member', 'admin'],
        }),
      },
    });

    expect(generateEnumsCode([collection])).toMatchSnapshot();
  });

  test('without name', () => {
    const collection = new CollectionSchema({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: enums({
          values: ['member', 'admin'],
        }),
      },
    });

    expect(generateEnumsCode([collection])).toMatchSnapshot();
  });
});

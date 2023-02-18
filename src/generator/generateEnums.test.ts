import { enums } from '../schema/enums';
import { generateEnumsCode } from './codeGenerator';
import { CollectionSchema } from '../schema/CollectionSchema';
import { objectId } from '../schema/objectId';

describe('generateEnums()', () => {
  it('should works normally', () => {
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

  it('should work without name', () => {
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

  it('should work with duplicated name', () => {
    const userType = enums({
      name: 'UserType',
      values: ['member', 'admin'],
    });
    const collection = new CollectionSchema({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: userType,
        prevType: userType,
      },
    });

    expect(generateEnumsCode([collection])).toMatchSnapshot();
  });

  it('should throw error', () => {
    const collection = new CollectionSchema({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: enums({
          name: 'UserType',
          values: ['member', 'admin'],
        }),
        prevType: enums({
          name: 'UserType',
          values: ['guest', 'member', 'admin'],
        }),
      },
    });

    expect(() => generateEnumsCode([collection])).toThrowError();
  });
});

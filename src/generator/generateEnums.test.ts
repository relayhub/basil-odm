import { enums } from '../schema/enums';
import { generateEnumsCode } from './codeGenerator';
import { collection } from '../schema/collection';
import { objectId } from '../schema/objectId';

describe('generateEnums()', () => {
  it('should works normally', () => {
    const users = collection({
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

    expect(generateEnumsCode([users])).toMatchSnapshot();
  });

  it('should work without name', () => {
    const users = collection({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: enums({
          values: ['member', 'admin'],
        }),
      },
    });

    expect(generateEnumsCode([users])).toMatchSnapshot();
  });

  it('should work with duplicated name', () => {
    const userType = enums({
      name: 'UserType',
      values: ['member', 'admin'],
    });
    const users = collection({
      collectionName: 'users',
      entityName: 'User',
      fields: {
        _id: objectId,
        type: userType,
        prevType: userType,
      },
    });

    expect(generateEnumsCode([users])).toMatchSnapshot();
  });

  it('should throw error', () => {
    const users = collection({
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

    expect(() => generateEnumsCode([users])).toThrowError();
  });
});

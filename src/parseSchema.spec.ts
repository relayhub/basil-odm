import { collection } from './schema/collection';
import { string } from './schema/string';
import { number } from './schema/number';
import { objectId } from './schema/objectId';
import { hasOne } from './schema/edges';
import { parseSchema } from './parseSchema';

describe('parseSchema()', () => {
  it('should works normally', () => {
    expect(() => {
      parseSchema({
        users: collection({
          collectionName: 'users',
          fields: {
            _id: objectId,
            name: string,
            age: number,
            email: string,
          },
          edges: {
            posts: hasOne({
              collection: 'posts', // <- this is invalid
              referenceField: '_id',
            }),
          },
        }),
      });
    }).toThrow('Edge collection not found: "posts"');

    expect(() => {
      parseSchema({
        users: collection({
          collectionName: 'users',
          fields: {
            _id: objectId,
            name: string,
            age: number,
            email: string,
            ownerId: objectId,
          },
          edges: {
            name: hasOne({
              // <- this is invalid
              collection: 'users',
              referenceField: 'ownerId',
            }),
          },
        }),
      });
    }).toThrow('Conflict field name: "name"');
  });
});

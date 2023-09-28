import { generateCollectionDefs } from './codeGenerator';
import { createFieldsSchema } from '../schema/FieldsSchema';
import { enums } from '../schema/enums';
import { generateDocumentTypes } from './codeGenerator';
import { collection } from '../schema/collection';
import { objectId } from '../schema/objectId';
import { date } from '../schema/date';
import { boolean } from '../schema/boolean';
import { string } from '../schema/string';
import { record } from '../schema/record';
import { hasOne } from '../schema/edges';
import { CollectionDef } from '../types';
import { format } from '../testUtils';

describe('generateCollectionDefs()', () => {
  it('should works normally', () => {
    const code = generateCollectionDefs([
      {
        fields: createFieldsSchema({
          _id: objectId,
        }),
        indexes: [],
        collectionName: 'foobar',
        entityName: 'Foobar',
        options: {
          comment: 'foobar',
          capped: true,
        },
      },
    ]);

    expect(code).toMatchSnapshot();
  });
});

const table: {
  collections: CollectionDef[];
}[] = [
  {
    collections: [
      collection({
        collectionName: 'docs',
        fields: {
          _id: objectId(),
          createdAt: date(),
          flag: boolean(),
          status: enums({ values: ['created', 'deleted'] }),
          name: string(),
          sub: {
            name: string(),
          },
          record: record(string),
        },
      }),
    ],
  },
  {
    collections: [
      collection({
        collectionName: 'docs',
        fields: {
          _id: objectId(),
          userId: objectId(),
        },
        edges: {
          user: hasOne({
            collection: 'users',
            referenceField: 'userId',
          }),
        },
      }),
      collection({
        collectionName: 'users',
        fields: {
          _id: objectId(),
        },
      }),
    ],
  },
];

test.each(table)('generateDocumentTypes() #%#', ({ collections }) => {
  const code = generateDocumentTypes(collections);
  expect(format(code)).toMatchSnapshot();
});

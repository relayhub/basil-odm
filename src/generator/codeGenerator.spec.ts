import { enums } from '../schema/enums';
import { generateDocumentTypes } from './codeGenerator';
import { collection } from '../schema/collection';
import { objectId } from '../schema/objectId';
import { date } from '../schema/date';
import { boolean } from '../schema/boolean';
import { string } from '../schema/string';
import { record } from '../schema/record';
import { hasOne, hasMany } from '../schema/edges';
import { CollectionDef } from '../types';
import { format } from '../testUtils';
import { shape } from '../schema/FieldsSchema';
import { nullable } from '../schema/nullable';

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
          sub: shape({
            name: string(),
          }),
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
  {
    collections: [
      collection({
        collectionName: 'docs',
        fields: {
          _id: objectId(),
          userId: objectId(),
        },
      }),
      collection({
        collectionName: 'users',
        fields: {
          _id: objectId(),
        },
        edges: {
          docs: hasMany({
            collection: 'docs',
            referenceField: 'userId',
          }),
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
          status: nullable(enums({ values: ['created', 'deleted'] })),
        },
      }),
    ],
  },
];

test.each(table)('generateDocumentTypes() #%#', ({ collections }) => {
  const code = generateDocumentTypes(collections);
  expect(format(code)).toMatchSnapshot();
});

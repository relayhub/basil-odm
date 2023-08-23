import { enums } from '../schema/enums';
import { generateDocumentTypes } from './codeGenerator';
import { collection } from '../schema/collection';
import { objectId } from '../schema/objectId';
import { date } from '../schema/date';
import { boolean } from '../schema/boolean';
import { string } from '../schema/string';
import { record } from '../schema/record';

const table = [
  [
    collection({
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
      collectionName: 'docs',
    }),
  ],
] as const;

test.each(table)('generateDocumentTypes() #%#', (collection) => {
  const code = generateDocumentTypes([collection]);
  expect(code).toMatchSnapshot();
});

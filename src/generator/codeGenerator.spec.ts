import { generateCollectionDefs } from './codeGenerator';
import { createFieldsSchema } from '../schema/FieldsSchema';
import { objectId } from '../schema/objectId';

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

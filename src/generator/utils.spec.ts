import { enums } from '../schema/enums';
import { createFieldsSchema } from '../schema/FieldsSchema';
import { aggregateEnums, generateType } from './utils';
import { record } from '../schema/record';
import { string } from '../schema/string';
import { boolean } from '../schema/boolean';
import { objectId } from '../schema/objectId';
import { union } from '../schema/union';

describe('aggregateEnums()', () => {
  it('should works normally', () => {
    const aggregated = aggregateEnums({
      kind: 'enum',
      values: {
        0: '0',
      },
    });
    expect(aggregated.length).toBe(1);
  });

  it('should works normally', () => {
    const aggregated = aggregateEnums(
      createFieldsSchema({
        union: union(
          enums({
            values: [1, 2, 3],
          }),
          enums({
            values: ['a', 'b', 'c'],
          })
        ),
      }).getSchemaAST()
    );
    expect(aggregated.length).toBe(2);
  });

  it('should works normally', () => {
    const aggregated = aggregateEnums(
      createFieldsSchema({
        record: record(
          enums({
            values: [1, 2, 3],
          })
        ),
      }).getSchemaAST()
    );
    expect(aggregated.length).toBe(1);
  });
});

describe('generateType()', () => {
  it('should works normally', () => {
    expect(generateType(string().buildASTNode())).toBe('string');
    expect(generateType(boolean().buildASTNode())).toBe('boolean');
    expect(generateType(objectId().buildASTNode())).toBe('$$mongodb.ObjectId');
  });
});

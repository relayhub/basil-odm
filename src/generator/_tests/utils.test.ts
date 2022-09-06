import { enums } from '../../schema/enums';
import { createFieldsSchema, union } from '../../schema/FieldsSchema';
import { aggregateEnums } from '../utils';

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
});

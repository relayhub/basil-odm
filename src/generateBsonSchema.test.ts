import { generateBsonSchema } from './generateBsonSchema';

describe('generateBsonSchema()', () => {
  it('should works normally', () => {
    const bsonSchema = generateBsonSchema({
      kind: 'record',
      item: { kind: 'string' },
    });

    expect(bsonSchema).toEqual({
      bsonType: 'object',
      properties: {},
      additionalProperties: { bsonType: 'string' },
    });
  });
});

import { createFieldsSchema, FieldsSchema, union } from '../schema/FieldsSchema';
import { enums } from '../schema/enums';
import { generateTypeFromSchema } from './codeGenerator';
import { literal } from '../schema/literal';
import { format } from '../testUtils';
import { nullable } from '../schema/nullable';
import { objectId } from '../schema/objectId';
import { string } from '../schema/string';
import { number } from '../schema/number';
import { boolean } from '../schema/boolean';
import { date } from '../schema/date';

type Case = [string, FieldsSchema, string];

const table: Case[] = [
  ['ObjectId', createFieldsSchema({ _id: objectId() }), '{_id: mongodb.ObjectId}'],

  [
    'value types',
    createFieldsSchema({
      stringField: string(),
      booleanField: boolean(),
      numberField: number(),
      nullField: literal(null),
    }),
    `{
      stringField: string;
      booleanField: boolean;
      numberField: number;
      nullField: null;
    }`,
  ],

  [
    'nullable',
    createFieldsSchema({
      nullableField: nullable(string()),
    }),
    `{nullableField?: null | string;}`,
  ],

  [
    'nested',
    createFieldsSchema({
      objectField: {
        _id: objectId(),
      },
    }),
    `{objectField: {_id: mongodb.ObjectId}}`,
  ],

  [
    'array(string)',
    createFieldsSchema({
      arrayField: [string()],
    }),
    `{arrayField: Array<string>}`,
  ],

  [
    'date',
    createFieldsSchema({
      dateField: date(),
    }),
    `{dateField: Date}`,
  ],

  [
    'union(string)',
    createFieldsSchema({
      unionField: union(literal('foo'), literal('bar')),
    }),
    `{unionField: 'foo' | 'bar'}`,
  ],

  [
    'enums(string)',
    createFieldsSchema({
      enumsField: enums({ values: ['foo', 'bar'] }),
    }),
    `{enumsField: 'foo' | 'bar'}`,
  ],

  [
    'enums(number)',
    createFieldsSchema({
      enumsField: enums({ values: [0, 1, 2, 3] }),
    }),
    `{enumsField: 0 | 1 | 2 | 3}`,
  ],
];

test.each(table)('generateTypeFromSchema() #%# - %s', (name, schema, expected) => {
  const prefix = 'type Entity = ';
  const code = generateTypeFromSchema(schema.getSchemaAST());
  expect(format(prefix + code)).toBe(format(prefix + expected));
});

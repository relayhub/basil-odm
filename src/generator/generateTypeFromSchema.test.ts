import { createFieldsSchema, FieldsSchema, union } from '../schema/FieldsSchema';
import { enums } from '../schema/enums';
import { generateTypeFromSchema } from './codeGenerator';
import { literal } from '../schema/literal';
import { nullable } from '../schema/nullable';
import { objectId } from '../schema/objectId';
import { string } from '../schema/string';
import { number } from '../schema/number';
import { boolean } from '../schema/boolean';
import { date } from '../schema/date';

type Case = [string, FieldsSchema, string];

const table: Case[] = [
  ['ObjectId', createFieldsSchema({ _id: objectId() }), '{\n"_id": \nmongodb.ObjectId\n;\n}'],

  [
    'value types',
    createFieldsSchema({
      stringField: string(),
      booleanField: boolean(),
      numberField: number(),
      nullField: literal(null),
    }),
    `{
"stringField": 
string
;
"booleanField": 
boolean
;
"numberField": 
number
;
"nullField": 
null
;
}`,
  ],

  [
    'nullable',
    createFieldsSchema({
      nullableField: nullable(string()),
    }),
    `{\n"nullableField"?: \n| null| string\n;\n}`,
  ],

  [
    'nested',
    createFieldsSchema({
      objectField: {
        _id: objectId(),
      },
    }),
    `{\n"objectField": \n{\n"_id": \nmongodb.ObjectId\n;\n}\n;\n}`,
  ],

  [
    'array(string)',
    createFieldsSchema({
      arrayField: [string()],
    }),
    `{\n"arrayField": \nArray<string>\n;\n}`,
  ],

  [
    'date',
    createFieldsSchema({
      dateField: date(),
    }),
    `{\n"dateField": \nDate\n;\n}`,
  ],

  [
    'union(string)',
    createFieldsSchema({
      unionField: union(literal('foo'), literal('bar')),
    }),
    `{\n"unionField": \n| "foo"| "bar"\n;\n}`,
  ],

  [
    'enums(string)',
    createFieldsSchema({
      enumsField: enums({ values: ['foo', 'bar'] }),
    }),
    `{\n"enumsField": \n| "foo"| "bar"\n;\n}`,
  ],

  [
    'enums(number)',
    createFieldsSchema({
      enumsField: enums({ values: [0, 1, 2, 3] }),
    }),
    `{\n"enumsField": \n| 0| 1| 2| 3\n;\n}`,
  ],
];

test.each(table)('generateTypeFromSchema() #%# - %s', (name, schema, expected) => {
  const code = generateTypeFromSchema(schema.getSchemaAST());
  expect(code).toBe(expected);
});

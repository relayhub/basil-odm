import { SchemaNode } from '../schema/astTypes';
import { validate } from '../validate';

type Case = [SchemaNode, unknown];

const successCases: Case[] = [
  [
    {
      kind: 'string',
    },
    'foobar',
  ],
  [
    {
      kind: 'string',
      maxLength: 3,
    },
    'foo',
  ],
];

const failCases: Case[] = [
  [
    {
      kind: 'string',
    },
    1,
  ],
  [
    {
      kind: 'string',
      maxLength: 2,
    },
    'foo',
  ],
];

test.each(successCases)('validate() #%#', (node, target) => {
  const messages = validate(target, node, []);
  expect(messages.length).toEqual(0);
});

test.each(failCases)('validate() should generate error messages #%#', (node, target) => {
  const messages = validate(target, node, []);
  expect(messages.length).toBeGreaterThan(0);
});

test('validate(string)', () => {
  const target = 'hoge';
  const errors = validate(target, { kind: 'string', maxLength: 3 }, []);
  expect(errors[0].message).toBe('String length exceeds "maxLength"');
});

import { createDocument } from './extract';
import { FieldsSchemaRoot } from './schema/astTypes';

type Case = [FieldsSchemaRoot, Record<string, unknown>, Record<string, unknown>];

const successCases: Case[] = [
  [
    {
      kind: 'object',
      props: {
        name: {
          kind: 'field',
          node: {
            kind: 'string',
          },
          isOptional: false,
        },
      },
      allowAdditionalProps: false,
    },
    {
      name: 'foobar',
    },
    {
      name: 'foobar',
    },
  ],
];

const failCases: Case[] = [
  [
    {
      kind: 'object',
      props: {
        name: {
          kind: 'field',
          node: {
            kind: 'string',
          },
          isOptional: false,
        },
      },
      allowAdditionalProps: false,
    },
    {
      name: 'foobar',
      _id: 'string',
    },
    {
      name: 'foobar',
      _id: 'string',
    },
  ],
];

test.each(successCases)('createDocument() #%#', (root, target, expected) => {
  const document = createDocument(target, root);
  expect(document).toEqual(expected);
});

test.each(failCases)('createDocument() should fail #%#', (root, target, expected) => {
  const document = createDocument(target, root);
  expect(document).not.toEqual(expected);
});

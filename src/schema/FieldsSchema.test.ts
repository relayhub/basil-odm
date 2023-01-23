import { arrayOf, createFieldsSchema, union } from './FieldsSchema';
import mongodb from 'mongodb';
import { literal } from './literal';
import { nullable } from './nullable';
import { string } from './string';
import { objectId } from './objectId';
import { object } from './object';
import { enums } from './enums';

test('schema()', () => {
  {
    const schema = createFieldsSchema({ foo: string() });

    expect(schema.decode({ foo: 'hoge' })).toEqual({ foo: 'hoge' });
    expect(schema.encode({ foo: 'hoge' })).toEqual({ foo: 'hoge' });
    expect(schema.generateBsonSchema()).toEqual({
      additionalProperties: false,
      bsonType: 'object',
      properties: {
        foo: { bsonType: 'string' },
      },
      required: ['foo'],
    });

    expect(schema.getSchemaAST()).toEqual({
      kind: 'object',
      props: {
        foo: {
          kind: 'field',
          isOptional: false,
          node: {
            kind: 'string',
          },
        },
      },
      allowAdditionalProps: false,
    });
  }

  {
    const schema = createFieldsSchema({ id: string() });

    expect(schema.decode({ id: 'hoge' })).toEqual({ id: 'hoge' });
    expect(schema.encode({ id: 'hoge' })).toEqual({ id: 'hoge' });
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['id'],
      properties: {
        id: { bsonType: 'string' },
      },
      additionalProperties: false,
    });
  }

  {
    const schema = createFieldsSchema({ myName: string() });

    expect(schema.decode({ myName: 'hoge' })).toEqual({ myName: 'hoge' });
    expect(() => schema.decode({ myName: undefined })).toThrow(Error);
    expect(schema.encode({ myName: 'hoge' })).toEqual({ myName: 'hoge' });
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['myName'],
      properties: {
        myName: { bsonType: 'string' },
      },
      additionalProperties: false,
    });
  }

  {
    const schema = createFieldsSchema({ _id: objectId() });
    const id = new mongodb.ObjectId('123456789012');
    expect(schema.decode({ _id: id })).toEqual({ _id: id });
    expect(schema.encode({ _id: id })).toEqual({ _id: id });
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['_id'],
      properties: {
        _id: { bsonType: 'objectId' },
      },
      additionalProperties: false,
    });
  }

  {
    const schema = createFieldsSchema({ tags: arrayOf(string()) });
    expect(schema.decode({ tags: ['a', 'b'] })).toEqual({ tags: ['a', 'b'] });
    expect(schema.encode({ tags: ['a', 'b'] })).toEqual({ tags: ['a', 'b'] });
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['tags'],
      properties: {
        tags: {
          bsonType: 'array',
          items: { bsonType: 'string' },
        },
      },
      additionalProperties: false,
    });
  }

  {
    const schema = createFieldsSchema({ obj: object() });
    expect(schema.decode({ obj: { myName: 'foobar' } })).toEqual({
      obj: { myName: 'foobar' },
    });
    expect(schema.encode({ obj: { myName: 'foobar' } })).toEqual({
      obj: { myName: 'foobar' },
    });
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['obj'],
      properties: {
        obj: {
          bsonType: 'object',
          additionalProperties: true,
        },
      },
      additionalProperties: false,
    });
  }

  {
    const schema = createFieldsSchema({ type: enums({ values: [1, '2', 3] }) });
    expect(schema.decode({ type: 1 })).toEqual({ type: 1 });
    expect(() => schema.decode({ type: 0 })).toThrow(Error);
    expect(schema.encode({ type: '2' })).toEqual({ type: '2' });
    expect(() => schema.encode({ type: 2 })).toThrow(Error);
    expect(schema.generateBsonSchema()).toEqual({
      bsonType: 'object',
      required: ['type'],
      properties: {
        type: { enum: [1, '2', 3] },
      },
      additionalProperties: false,
    });
  }
});

test('Nullable', () => {
  {
    const schema = createFieldsSchema({
      body: nullable({
        name: string(),
      }),
    });

    expect(schema.decode({ body: { name: 'bar' } })).toEqual({
      body: { name: 'bar' },
    });
    expect(schema.decode({})).toEqual({});
    schema.getSchemaAST();
  }
});

test('Literal', () => {
  const schemaFragment = literal('foobar');
});

test('Union', () => {
  const schema = createFieldsSchema({
    type: union(literal('foo'), literal('bar')),
  });

  expect(schema.decode({ type: 'bar' })).toEqual({ type: 'bar' });
  expect(() => schema.decode({ type: 'foobar' })).toThrow(Error);

  expect(schema.encode({ type: 'bar' })).toEqual({ type: 'bar' });
  expect(() => schema.encode({ type: 'foobar' })).toThrow(Error);

  expect(schema.generateBsonSchema()).toEqual({
    bsonType: 'object',
    required: ['type'],
    properties: {
      type: {
        anyOf: [{ enum: ['foo'] }, { enum: ['bar'] }],
      },
    },
    additionalProperties: false,
  });
});

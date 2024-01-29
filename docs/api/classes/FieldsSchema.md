[@relayhub/basil-odm](../README.md) / FieldsSchema

# Class: FieldsSchema\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](FieldsSchema.md#constructor)

### Properties

- [\_schemaRoot](FieldsSchema.md#_schemaroot)
- [\_type](FieldsSchema.md#_type)

### Methods

- [decode](FieldsSchema.md#decode)
- [encode](FieldsSchema.md#encode)
- [generateBsonSchema](FieldsSchema.md#generatebsonschema)
- [getSchemaAST](FieldsSchema.md#getschemaast)

## Constructors

### constructor

• **new FieldsSchema**\<`T`\>(`schemaRoot`): [`FieldsSchema`](FieldsSchema.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaRoot` | `ObjectNode` |

#### Returns

[`FieldsSchema`](FieldsSchema.md)\<`T`\>

#### Defined in

[src/schema/FieldsSchema.ts:61](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L61)

## Properties

### \_schemaRoot

• **\_schemaRoot**: `ObjectNode`

#### Defined in

[src/schema/FieldsSchema.ts:59](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L59)

___

### \_type

• `Optional` **\_type**: `T`

#### Defined in

[src/schema/FieldsSchema.ts:57](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L57)

## Methods

### decode

▸ **decode**(`entity`): `Document`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `Entity` |

#### Returns

`Document`

#### Defined in

[src/schema/FieldsSchema.ts:69](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L69)

___

### encode

▸ **encode**(`document`, `source?`): `Entity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |
| `source` | `Record`\<`string`, `unknown`\> |

#### Returns

`Entity`

#### Defined in

[src/schema/FieldsSchema.ts:73](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L73)

___

### generateBsonSchema

▸ **generateBsonSchema**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

#### Defined in

[src/schema/FieldsSchema.ts:77](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L77)

___

### getSchemaAST

▸ **getSchemaAST**(): `ObjectNode`

#### Returns

`ObjectNode`

#### Defined in

[src/schema/FieldsSchema.ts:65](https://github.com/relayhub/basil-odm/blob/23aa37c/src/schema/FieldsSchema.ts#L65)

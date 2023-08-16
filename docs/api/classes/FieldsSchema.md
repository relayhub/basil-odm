[basil-odm](../README.md) / FieldsSchema

# Class: FieldsSchema

## Table of contents

### Constructors

- [constructor](FieldsSchema.md#constructor)

### Properties

- [\_schemaRoot](FieldsSchema.md#_schemaroot)

### Methods

- [decode](FieldsSchema.md#decode)
- [encode](FieldsSchema.md#encode)
- [generateBsonSchema](FieldsSchema.md#generatebsonschema)
- [getSchemaAST](FieldsSchema.md#getschemaast)

## Constructors

### constructor

• **new FieldsSchema**(`schemaRoot`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaRoot` | `ObjectNode` |

#### Defined in

[src/schema/FieldsSchema.ts:114](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L114)

## Properties

### \_schemaRoot

• **\_schemaRoot**: `ObjectNode`

#### Defined in

[src/schema/FieldsSchema.ts:112](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L112)

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

[src/schema/FieldsSchema.ts:122](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L122)

___

### encode

▸ **encode**(`document`, `source?`): `Entity`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |
| `source` | `Record`<`string`, `unknown`\> |

#### Returns

`Entity`

#### Defined in

[src/schema/FieldsSchema.ts:126](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L126)

___

### generateBsonSchema

▸ **generateBsonSchema**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

#### Defined in

[src/schema/FieldsSchema.ts:130](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L130)

___

### getSchemaAST

▸ **getSchemaAST**(): `ObjectNode`

#### Returns

`ObjectNode`

#### Defined in

[src/schema/FieldsSchema.ts:118](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/schema/FieldsSchema.ts#L118)

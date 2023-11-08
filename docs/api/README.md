basil-odm

# basil-odm

## Table of contents

### Classes

- [Base](classes/Base.md)
- [Basil](classes/Basil.md)
- [BasilCollection](classes/BasilCollection.md)
- [FieldsSchema](classes/FieldsSchema.md)

### Interfaces

- [BasilSettings](interfaces/BasilSettings.md)

### Type Aliases

- [BaseClass](README.md#baseclass)
- [CollectionDef](README.md#collectiondef)
- [CollectionOptions](README.md#collectionoptions)
- [DefinedSchema](README.md#definedschema)
- [FindByIdsOptions](README.md#findbyidsoptions)
- [Index](README.md#index)
- [IndexFields](README.md#indexfields)
- [IndexOptions](README.md#indexoptions)
- [RuntimeCollectionSchema](README.md#runtimecollectionschema)

### Variables

- [basil](README.md#basil)
- [getSchemaFragmentSymbol](README.md#getschemafragmentsymbol)
- [optionalPropertyFlag](README.md#optionalpropertyflag)
- [schemaFragmentFrag](README.md#schemafragmentfrag)

### Functions

- [boolean](README.md#boolean)
- [collection](README.md#collection)
- [configure](README.md#configure)
- [createFieldsSchema](README.md#createfieldsschema)
- [createSettings](README.md#createsettings)
- [date](README.md#date)
- [disconnect](README.md#disconnect)
- [enums](README.md#enums)
- [generateCode](README.md#generatecode)
- [getSchemaFragment](README.md#getschemafragment)
- [hasOne](README.md#hasone)
- [index](README.md#index-1)
- [literal](README.md#literal)
- [loadConfig](README.md#loadconfig)
- [nullable](README.md#nullable)
- [number](README.md#number)
- [object](README.md#object)
- [objectId](README.md#objectid)
- [prepareDb](README.md#preparedb)
- [record](README.md#record)
- [string](README.md#string)
- [validateConfig](README.md#validateconfig)

## Type Aliases

### BaseClass

Ƭ **BaseClass**\<`T`, `E`\>: typeof [`Base`](classes/Base.md) & () => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | `unknown` |

#### Defined in

[src/Base.ts:11](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L11)

___

### CollectionDef

Ƭ **CollectionDef**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |
| `edges?` | `Record`\<`string`, `Edge`\> |
| `entityName` | `string` |
| `fields` | [`FieldsSchema`](classes/FieldsSchema.md) |
| `indexes` | [`Index`](README.md#index)[] |
| `options?` | [`CollectionOptions`](README.md#collectionoptions) |

#### Defined in

[src/types.ts:28](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L28)

___

### CollectionOptions

Ƭ **CollectionOptions**: `Omit`\<`mongodb.CreateCollectionOptions` & `Record`\<`string`, `unknown`\>, ``"validator"``\>

#### Defined in

[src/types.ts:26](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L26)

___

### DefinedSchema

Ƭ **DefinedSchema**: `Record`\<`string`, [`CollectionDef`](README.md#collectiondef)\> \| [`CollectionDef`](README.md#collectiondef)[]

#### Defined in

[src/types.ts:58](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L58)

___

### FindByIdsOptions

Ƭ **FindByIdsOptions**\<`T`\>: `mongodb.FindOptions`\<`T`\> & \{ `filter?`: `mongodb.Filter`\<`T`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `mongodb.Document` |

#### Defined in

[src/Base.ts:16](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L16)

___

### Index

Ƭ **Index**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [`IndexFields`](README.md#indexfields) |
| `options?` | [`IndexOptions`](README.md#indexoptions) |

#### Defined in

[src/types.ts:21](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L21)

___

### IndexFields

Ƭ **IndexFields**: `Object`

#### Index signature

▪ [key: `string`]: ``-1`` \| ``1``

#### Defined in

[src/types.ts:14](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L14)

___

### IndexOptions

Ƭ **IndexOptions**: \{ `sparse?`: `boolean` ; `unique?`: `boolean`  } & `CreateIndexesOptions`

#### Defined in

[src/types.ts:16](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L16)

___

### RuntimeCollectionSchema

Ƭ **RuntimeCollectionSchema**\<`Entity`, `Edges`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | `Entity` |
| `Edges` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Entity?` | () => `Entity` |
| `_edgesType?` | `Edges` |
| `_type?` | `Entity` |
| `collectionName` | `string` |
| `edges?` | `Record`\<`string`, `RuntimeEdge`\> |
| `fields` | [`FieldsSchema`](classes/FieldsSchema.md) |
| `indexes` | [`Index`](README.md#index)[] |
| `options?` | [`CollectionOptions`](README.md#collectionoptions) |

#### Defined in

[src/types.ts:37](https://github.com/anatoo/basil-odm/blob/5373178/src/types.ts#L37)

## Variables

### basil

• `Const` **basil**: [`Basil`](classes/Basil.md)

#### Defined in

[src/Basil.ts:168](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L168)

___

### getSchemaFragmentSymbol

• `Const` **getSchemaFragmentSymbol**: typeof [`getSchemaFragmentSymbol`](README.md#getschemafragmentsymbol)

#### Defined in

[src/schema/symbols.ts:3](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/symbols.ts#L3)

___

### optionalPropertyFlag

• `Const` **optionalPropertyFlag**: typeof [`optionalPropertyFlag`](README.md#optionalpropertyflag)

#### Defined in

[src/schema/symbols.ts:1](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/symbols.ts#L1)

___

### schemaFragmentFrag

• `Const` **schemaFragmentFrag**: typeof [`schemaFragmentFrag`](README.md#schemafragmentfrag)

#### Defined in

[src/schema/symbols.ts:2](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/symbols.ts#L2)

## Functions

### boolean

▸ **boolean**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/boolean.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/boolean.ts#L4)

___

### collection

▸ **collection**(`props`): [`CollectionDef`](README.md#collectiondef)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |

#### Returns

[`CollectionDef`](README.md#collectiondef)

#### Defined in

[src/schema/collection.ts:15](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/collection.ts#L15)

___

### configure

▸ **configure**(`settings`): `void`

Set connection information by code without using a configuration file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`BasilSettings`](interfaces/BasilSettings.md) |

#### Returns

`void`

#### Defined in

[src/Basil.ts:175](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L175)

___

### createFieldsSchema

▸ **createFieldsSchema**(`source`): [`FieldsSchema`](classes/FieldsSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `ObjectSchemaSource` |

#### Returns

[`FieldsSchema`](classes/FieldsSchema.md)

#### Defined in

[src/schema/FieldsSchema.ts:100](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/FieldsSchema.ts#L100)

___

### createSettings

▸ **createSettings**(`config`, `«destructured»`): `Promise`\<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config` |
| `«destructured»` | `Object` |
| › `configPath` | `string` |

#### Returns

`Promise`\<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Defined in

[src/Config.ts:62](https://github.com/anatoo/basil-odm/blob/5373178/src/Config.ts#L62)

___

### date

▸ **date**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/date.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/date.ts#L4)

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

Disconnect from MongoDB established by Basil ODM.

Explicitly call this function when exiting the application, exiting a test, or exiting a batch process.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:184](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L184)

___

### enums

▸ **enums**(`props`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.name?` | `string` |
| `props.values` | `Record`\<`string`, `Value`\> \| `Record`\<`number`, `Value`\> |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/enums.ts:5](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/enums.ts#L5)

___

### generateCode

▸ **generateCode**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `CodeGeneratorConfig` |

#### Returns

`void`

#### Defined in

[src/generator/codeGenerator.ts:204](https://github.com/anatoo/basil-odm/blob/5373178/src/generator/codeGenerator.ts#L204)

___

### getSchemaFragment

▸ **getSchemaFragment**(`target`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `SchemaLike` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/utils.ts:6](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/utils.ts#L6)

___

### hasOne

▸ **hasOne**(`props`): `HasOne`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`HasOne`, ``"type"``\> |

#### Returns

`HasOne`

#### Defined in

[src/schema/edges.ts:3](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/edges.ts#L3)

___

### index

▸ **index**(`fields`, `options?`): [`Index`](README.md#index)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`IndexFields`](README.md#indexfields) |
| `options` | `CreateIndexesOptions` |

#### Returns

[`Index`](README.md#index)

#### Defined in

[src/schema/createIndex.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/createIndex.ts#L4)

___

### literal

▸ **literal**(`value`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` \| `string` \| `number` \| `boolean` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/literal.ts:5](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/literal.ts#L5)

___

### loadConfig

▸ **loadConfig**(`configPath?`, `«destructured»?`): `Promise`\<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath` | `string` |
| `«destructured»` | `Object` |
| › `silent?` | `boolean` |

#### Returns

`Promise`\<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Defined in

[src/Config.ts:42](https://github.com/anatoo/basil-odm/blob/5373178/src/Config.ts#L42)

___

### nullable

▸ **nullable**\<`T`\>(`schemaLike`): `SchemaFragment`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SchemaLike` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaLike` | `T` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/nullable.ts:5](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/nullable.ts#L5)

___

### number

▸ **number**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/number.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/number.ts#L4)

___

### object

▸ **object**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/object.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/object.ts#L4)

___

### objectId

▸ **objectId**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/objectId.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/objectId.ts#L4)

___

### prepareDb

▸ **prepareDb**(`schema`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`DefinedSchema`](README.md#definedschema) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/utils.ts:45](https://github.com/anatoo/basil-odm/blob/5373178/src/utils.ts#L45)

___

### record

▸ **record**\<`T`\>(`schemaLike`): `SchemaFragment`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SchemaLike` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaLike` | `T` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/record.ts:5](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/record.ts#L5)

___

### string

▸ **string**(`options?`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maxLength?` | `number` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/string.ts:4](https://github.com/anatoo/basil-odm/blob/5373178/src/schema/string.ts#L4)

___

### validateConfig

▸ **validateConfig**(`config`): asserts config is Config

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `unknown` |

#### Returns

asserts config is Config

#### Defined in

[src/Config.ts:25](https://github.com/anatoo/basil-odm/blob/5373178/src/Config.ts#L25)

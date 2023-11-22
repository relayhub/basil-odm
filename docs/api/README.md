basil-odm

# basil-odm

## Table of contents

### Classes

- [Base](classes/Base.md)
- [Basil](classes/Basil.md)
- [BasilCollection](classes/BasilCollection.md)
- [FieldsSchema](classes/FieldsSchema.md)

### Interfaces

- [ResolvedConfig](interfaces/ResolvedConfig.md)

### Type Aliases

- [BaseClass](README.md#baseclass)
- [CollectionDef](README.md#collectiondef)
- [CollectionOptions](README.md#collectionoptions)
- [DefinedSchema](README.md#definedschema)
- [EdgeOptions](README.md#edgeoptions)
- [EdgesOptions](README.md#edgesoptions)
- [FindByIdsOptions](README.md#findbyidsoptions)
- [Index](README.md#index)
- [IndexFields](README.md#indexfields)
- [IndexOptions](README.md#indexoptions)
- [RuntimeCollectionSchema](README.md#runtimecollectionschema)

### Variables

- [basil](README.md#basil)
- [optionalPropertyFlag](README.md#optionalpropertyflag)
- [schemaFragmentFrag](README.md#schemafragmentfrag)

### Functions

- [arrayOf](README.md#arrayof)
- [arrayOfShape](README.md#arrayofshape)
- [boolean](README.md#boolean)
- [collection](README.md#collection)
- [configure](README.md#configure)
- [createFieldsSchema](README.md#createfieldsschema)
- [createSettings](README.md#createsettings)
- [date](README.md#date)
- [disconnect](README.md#disconnect)
- [enums](README.md#enums)
- [generateCode](README.md#generatecode)
- [hasMany](README.md#hasmany)
- [hasOne](README.md#hasone)
- [index](README.md#index-1)
- [literal](README.md#literal)
- [loadConfig](README.md#loadconfig)
- [nullable](README.md#nullable)
- [number](README.md#number)
- [objectId](README.md#objectid)
- [prepareDb](README.md#preparedb)
- [record](README.md#record)
- [shape](README.md#shape)
- [string](README.md#string)
- [union](README.md#union)
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

[src/Base.ts:10](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L10)

___

### CollectionDef

Ƭ **CollectionDef**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `[collectionDefSymbol]` | ``true`` |
| `collectionName` | `string` |
| `edges?` | `Record`\<`string`, `Edge`\> |
| `entityName` | `string` |
| `fields` | [`FieldsSchema`](classes/FieldsSchema.md)\<`unknown`\> |
| `indexes` | [`Index`](README.md#index)[] |
| `options?` | [`CollectionOptions`](README.md#collectionoptions) |

#### Defined in

[src/types.ts:32](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L32)

___

### CollectionOptions

Ƭ **CollectionOptions**: `Omit`\<`mongodb.CreateCollectionOptions` & `Record`\<`string`, `unknown`\>, ``"validator"``\>

#### Defined in

[src/types.ts:25](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L25)

___

### DefinedSchema

Ƭ **DefinedSchema**: `Record`\<`string`, [`CollectionDef`](README.md#collectiondef)\> \| [`CollectionDef`](README.md#collectiondef)[]

#### Defined in

[src/types.ts:69](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L69)

___

### EdgeOptions

Ƭ **EdgeOptions**\<`Entity`\>: ``true`` \| `mongodb.FindOptions`\<`Entity` extends `mongodb.Document` ? `mongodb.Document` : `Record`\<`string`, `never`\>\>

#### Type parameters

| Name |
| :------ |
| `Entity` |

#### Defined in

[src/types.ts:75](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L75)

___

### EdgesOptions

Ƭ **EdgesOptions**\<`SubsetEdges`, `Entity`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `SubsetEdges` |
| `Entity` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edges` | \{ [K in keyof SubsetEdges]: EdgeOptions\<Entity\> } |

#### Defined in

[src/types.ts:79](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L79)

___

### FindByIdsOptions

Ƭ **FindByIdsOptions**\<`T`\>: `mongodb.FindOptions`\<`T`\> & \{ `filter?`: `mongodb.Filter`\<`T`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `mongodb.Document` |

#### Defined in

[src/types.ts:71](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L71)

___

### Index

Ƭ **Index**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [`IndexFields`](README.md#indexfields) |
| `options?` | [`IndexOptions`](README.md#indexoptions) |

#### Defined in

[src/types.ts:20](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L20)

___

### IndexFields

Ƭ **IndexFields**: `Object`

#### Index signature

▪ [key: `string`]: ``-1`` \| ``1``

#### Defined in

[src/types.ts:13](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L13)

___

### IndexOptions

Ƭ **IndexOptions**: \{ `sparse?`: `boolean` ; `unique?`: `boolean`  } & `mongodb.CreateIndexesOptions`

#### Defined in

[src/types.ts:15](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L15)

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
| `fields` | [`FieldsSchema`](classes/FieldsSchema.md)\<`unknown`\> |
| `indexes` | [`Index`](README.md#index)[] |
| `options?` | [`CollectionOptions`](README.md#collectionoptions) |

#### Defined in

[src/types.ts:42](https://github.com/anatoo/basil-odm/blob/15cf09f/src/types.ts#L42)

## Variables

### basil

• `Const` **basil**: [`Basil`](classes/Basil.md)

#### Defined in

[src/Basil.ts:201](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L201)

___

### optionalPropertyFlag

• `Const` **optionalPropertyFlag**: typeof [`optionalPropertyFlag`](README.md#optionalpropertyflag)

#### Defined in

[src/schema/symbols.ts:1](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/symbols.ts#L1)

___

### schemaFragmentFrag

• `Const` **schemaFragmentFrag**: typeof [`schemaFragmentFrag`](README.md#schemafragmentfrag)

#### Defined in

[src/schema/symbols.ts:2](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/symbols.ts#L2)

## Functions

### arrayOf

▸ **arrayOf**\<`T`\>(`fragment`): `SchemaFragment`\<`T`[]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `SchemaFragment`\<`T`\> |

#### Returns

`SchemaFragment`\<`T`[]\>

#### Defined in

[src/schema/FieldsSchema.ts:32](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/FieldsSchema.ts#L32)

___

### arrayOfShape

▸ **arrayOfShape**\<`T`\>(`object`): `SchemaFragment`\<`T`[]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `ObjectSchemaSource`\<`T`\> |

#### Returns

`SchemaFragment`\<`T`[]\>

#### Defined in

[src/schema/FieldsSchema.ts:82](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/FieldsSchema.ts#L82)

___

### boolean

▸ **boolean**(): `SchemaFragment`\<`boolean`\>

#### Returns

`SchemaFragment`\<`boolean`\>

#### Defined in

[src/schema/boolean.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/boolean.ts#L4)

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

[src/schema/collection.ts:15](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/collection.ts#L15)

___

### configure

▸ **configure**(`settings`): `void`

Set connection information by code without using a configuration file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`ResolvedConfig`](interfaces/ResolvedConfig.md) |

#### Returns

`void`

#### Defined in

[src/Basil.ts:208](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L208)

___

### createFieldsSchema

▸ **createFieldsSchema**\<`T`\>(`source`): [`FieldsSchema`](classes/FieldsSchema.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `ObjectSchemaSource`\<`T`\> |

#### Returns

[`FieldsSchema`](classes/FieldsSchema.md)\<`T`\>

#### Defined in

[src/schema/FieldsSchema.ts:45](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/FieldsSchema.ts#L45)

___

### createSettings

▸ **createSettings**(`config`): [`ResolvedConfig`](interfaces/ResolvedConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config` |

#### Returns

[`ResolvedConfig`](interfaces/ResolvedConfig.md)

#### Defined in

[src/Config.ts:66](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Config.ts#L66)

___

### date

▸ **date**(): `SchemaFragment`\<`Date`\>

#### Returns

`SchemaFragment`\<`Date`\>

#### Defined in

[src/schema/date.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/date.ts#L4)

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

Disconnect from MongoDB established by Basil ODM.

Explicitly call this function when exiting the application, exiting a test, or exiting a batch process.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:217](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L217)

___

### enums

▸ **enums**\<`T`\>(`props`): `SchemaFragment`\<`T`[keyof `T`]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.name?` | `string` |
| `props.values` | \{ [K in string \| number \| symbol]: T[K] } |

#### Returns

`SchemaFragment`\<`T`[keyof `T`]\>

#### Defined in

[src/schema/enums.ts:5](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/enums.ts#L5)

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

[src/generator/codeGenerator.ts:266](https://github.com/anatoo/basil-odm/blob/15cf09f/src/generator/codeGenerator.ts#L266)

___

### hasMany

▸ **hasMany**(`props`): `HasMany`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`HasMany`, ``"type"``\> |

#### Returns

`HasMany`

#### Defined in

[src/schema/edges.ts:10](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/edges.ts#L10)

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

[src/schema/edges.ts:3](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/edges.ts#L3)

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

[src/schema/createIndex.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/createIndex.ts#L4)

___

### literal

▸ **literal**\<`T`\>(`value`): `SchemaFragment`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``null`` \| `string` \| `number` \| `boolean` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`SchemaFragment`\<`T`\>

#### Defined in

[src/schema/literal.ts:5](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/literal.ts#L5)

___

### loadConfig

▸ **loadConfig**(`configPath?`, `«destructured»?`): `Promise`\<[`ResolvedConfig`](interfaces/ResolvedConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath` | `string` |
| `«destructured»` | `Object` |
| › `silent?` | `boolean` |

#### Returns

`Promise`\<[`ResolvedConfig`](interfaces/ResolvedConfig.md)\>

#### Defined in

[src/Config.ts:42](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Config.ts#L42)

___

### nullable

▸ **nullable**\<`T`\>(`fragment`): `SchemaFragment`\<``null`` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `SchemaFragment`\<`T`\> |

#### Returns

`SchemaFragment`\<``null`` \| `T`\>

#### Defined in

[src/schema/nullable.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/nullable.ts#L4)

___

### number

▸ **number**(): `SchemaFragment`\<`number`\>

#### Returns

`SchemaFragment`\<`number`\>

#### Defined in

[src/schema/number.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/number.ts#L4)

___

### objectId

▸ **objectId**(): `SchemaFragment`\<`ObjectId`\>

#### Returns

`SchemaFragment`\<`ObjectId`\>

#### Defined in

[src/schema/objectId.ts:5](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/objectId.ts#L5)

___

### prepareDb

▸ **prepareDb**(`schema`, `config?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`DefinedSchema`](README.md#definedschema) |
| `config?` | [`ResolvedConfig`](interfaces/ResolvedConfig.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/utils.ts:60](https://github.com/anatoo/basil-odm/blob/15cf09f/src/utils.ts#L60)

___

### record

▸ **record**\<`T`\>(`fragment`): `SchemaFragment`\<`Record`\<`string`, `T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `SchemaFragment`\<`T`\> |

#### Returns

`SchemaFragment`\<`Record`\<`string`, `T`\>\>

#### Defined in

[src/schema/record.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/record.ts#L4)

___

### shape

▸ **shape**\<`T`\>(`object`): `SchemaFragment`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `ObjectSchemaSource`\<`T`\> |

#### Returns

`SchemaFragment`\<`T`\>

#### Defined in

[src/schema/FieldsSchema.ts:8](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/FieldsSchema.ts#L8)

___

### string

▸ **string**(`options?`): `SchemaFragment`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maxLength?` | `number` |

#### Returns

`SchemaFragment`\<`string`\>

#### Defined in

[src/schema/string.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/string.ts#L4)

___

### union

▸ **union**\<`T`\>(`...schemas`): `SchemaFragment`\<`InferSchemaFragmentType`\<`T`[`number`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SchemaFragment`\<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...schemas` | `T` |

#### Returns

`SchemaFragment`\<`InferSchemaFragmentType`\<`T`[`number`]\>\>

#### Defined in

[src/schema/union.ts:4](https://github.com/anatoo/basil-odm/blob/15cf09f/src/schema/union.ts#L4)

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

[src/Config.ts:25](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Config.ts#L25)

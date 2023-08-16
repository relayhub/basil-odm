basil-odm

# basil-odm

## Table of contents

### Classes

- [Base](classes/Base.md)
- [Basil](classes/Basil.md)
- [FieldsSchema](classes/FieldsSchema.md)

### Interfaces

- [BasilSettings](interfaces/BasilSettings.md)
- [CountParams](interfaces/CountParams.md)
- [EntityClass](interfaces/EntityClass.md)

### Type Aliases

- [CollectionDef](README.md#collectiondef)
- [DefinedSchema](README.md#definedschema)
- [EntityMeta](README.md#entitymeta)
- [FindByIdsOptions](README.md#findbyidsoptions)
- [Index](README.md#index)
- [IndexFields](README.md#indexfields)
- [IndexOptions](README.md#indexoptions)

### Variables

- [basil](README.md#basil)
- [getSchemaFragmentSymbol](README.md#getschemafragmentsymbol)
- [optionalPropertyFlag](README.md#optionalpropertyflag)
- [schemaFragmentFrag](README.md#schemafragmentfrag)

### Functions

- [arrayOf](README.md#arrayof)
- [arrayOfShape](README.md#arrayofshape)
- [boolean](README.md#boolean)
- [collection](README.md#collection)
- [collectionExists](README.md#collectionexists)
- [configure](README.md#configure)
- [createFieldsSchema](README.md#createfieldsschema)
- [createSettings](README.md#createsettings)
- [date](README.md#date)
- [disconnect](README.md#disconnect)
- [dumpValidationSchemas](README.md#dumpvalidationschemas)
- [ensureCollection](README.md#ensurecollection)
- [enums](README.md#enums)
- [generateCode](README.md#generatecode)
- [getSchemaFragment](README.md#getschemafragment)
- [index](README.md#index-1)
- [literal](README.md#literal)
- [loadConfig](README.md#loadconfig)
- [nullable](README.md#nullable)
- [number](README.md#number)
- [object](README.md#object)
- [objectId](README.md#objectid)
- [prepareDb](README.md#preparedb)
- [prettier](README.md#prettier)
- [record](README.md#record)
- [setJsonSchemaValidator](README.md#setjsonschemavalidator)
- [shape](README.md#shape)
- [string](README.md#string)
- [union](README.md#union)
- [validateConfig](README.md#validateconfig)

## Type Aliases

### CollectionDef

Ƭ **CollectionDef**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |
| `entityName` | `string` \| ``null`` |
| `indexes` | [`Index`](README.md#index)[] |
| `schema` | [`FieldsSchema`](classes/FieldsSchema.md) |

#### Defined in

[src/types.ts:27](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L27)

___

### DefinedSchema

Ƭ **DefinedSchema**: `Record`<`string`, [`CollectionDef`](README.md#collectiondef)\> \| [`CollectionDef`](README.md#collectiondef)[]

#### Defined in

[src/types.ts:41](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L41)

___

### EntityMeta

Ƭ **EntityMeta**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_type?` | `T` |
| `collectionName` | `string` |
| `indexes` | [`Index`](README.md#index)[] |
| `schema` | [`FieldsSchema`](classes/FieldsSchema.md) |

#### Defined in

[src/types.ts:34](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L34)

___

### FindByIdsOptions

Ƭ **FindByIdsOptions**<`T`\>: `mongodb.FindOptions`<`T`\> & { `filter?`: `mongodb.Filter`<`T`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `mongodb.Document` |

#### Defined in

[src/Base.ts:16](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L16)

___

### Index

Ƭ **Index**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [`IndexFields`](README.md#indexfields) |
| `options?` | [`IndexOptions`](README.md#indexoptions) |

#### Defined in

[src/types.ts:17](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L17)

___

### IndexFields

Ƭ **IndexFields**: `Object`

#### Index signature

▪ [key: `string`]: ``-1`` \| ``1``

#### Defined in

[src/types.ts:10](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L10)

___

### IndexOptions

Ƭ **IndexOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sparse?` | `boolean` |
| `unique?` | `boolean` |

#### Defined in

[src/types.ts:12](https://github.com/anatoo/basil-odm/blob/f14292c/src/types.ts#L12)

## Variables

### basil

• `Const` **basil**: [`Basil`](classes/Basil.md)

#### Defined in

[src/Basil.ts:168](https://github.com/anatoo/basil-odm/blob/f14292c/src/Basil.ts#L168)

___

### getSchemaFragmentSymbol

• `Const` **getSchemaFragmentSymbol**: typeof [`getSchemaFragmentSymbol`](README.md#getschemafragmentsymbol)

#### Defined in

[src/schema/symbols.ts:3](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/symbols.ts#L3)

___

### optionalPropertyFlag

• `Const` **optionalPropertyFlag**: typeof [`optionalPropertyFlag`](README.md#optionalpropertyflag)

#### Defined in

[src/schema/symbols.ts:1](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/symbols.ts#L1)

___

### schemaFragmentFrag

• `Const` **schemaFragmentFrag**: typeof [`schemaFragmentFrag`](README.md#schemafragmentfrag)

#### Defined in

[src/schema/symbols.ts:2](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/symbols.ts#L2)

## Functions

### arrayOf

▸ **arrayOf**<`T`\>(`item`): `SchemaFragment`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SchemaLike` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/FieldsSchema.ts:68](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/FieldsSchema.ts#L68)

___

### arrayOfShape

▸ **arrayOfShape**<`T`\>(`object`): `SchemaFragment`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectSchemaSource` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/FieldsSchema.ts:135](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/FieldsSchema.ts#L135)

___

### boolean

▸ **boolean**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/boolean.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/boolean.ts#L4)

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

[src/schema/collection.ts:12](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/collection.ts#L12)

___

### collectionExists

▸ **collectionExists**(`db`, `collectionName`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `Db` |
| `collectionName` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/utils.ts:47](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L47)

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

[src/Basil.ts:175](https://github.com/anatoo/basil-odm/blob/f14292c/src/Basil.ts#L175)

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

[src/schema/FieldsSchema.ts:100](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/FieldsSchema.ts#L100)

___

### createSettings

▸ **createSettings**(`config`, `«destructured»`): `Promise`<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config` |
| `«destructured»` | `Object` |
| › `configPath` | `string` |

#### Returns

`Promise`<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Defined in

[src/Config.ts:62](https://github.com/anatoo/basil-odm/blob/f14292c/src/Config.ts#L62)

___

### date

▸ **date**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/date.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/date.ts#L4)

___

### disconnect

▸ **disconnect**(): `Promise`<`void`\>

Disconnect from MongoDB established by Basil ODM.

Explicitly call this function when exiting the application, exiting a test, or exiting a batch process.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Basil.ts:184](https://github.com/anatoo/basil-odm/blob/f14292c/src/Basil.ts#L184)

___

### dumpValidationSchemas

▸ **dumpValidationSchemas**(`collections`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collections` | [`EntityMeta`](README.md#entitymeta)<`unknown`\>[] |

#### Returns

`void`

#### Defined in

[src/utils.ts:69](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L69)

___

### ensureCollection

▸ **ensureCollection**(`db`, `collectionName`, `«destructured»?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `Db` |
| `collectionName` | `string` |
| `«destructured»` | `Object` |
| › `$jsonSchema` | `Record`<`string`, `unknown`\> |
| › `indexes` | [`Index`](README.md#index)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:7](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L7)

___

### enums

▸ **enums**(`props`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.name?` | `string` |
| `props.values` | `Record`<`string`, `Value`\> \| `Record`<`number`, `Value`\> |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/enums.ts:5](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/enums.ts#L5)

___

### generateCode

▸ **generateCode**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GenerateCodeParams` |

#### Returns

`void`

#### Defined in

[src/generator/codeGenerator.ts:122](https://github.com/anatoo/basil-odm/blob/f14292c/src/generator/codeGenerator.ts#L122)

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

[src/schema/utils.ts:6](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/utils.ts#L6)

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

[src/utils.ts:84](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L84)

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

[src/schema/literal.ts:5](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/literal.ts#L5)

___

### loadConfig

▸ **loadConfig**(`configPath?`, `«destructured»?`): `Promise`<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath` | `string` |
| `«destructured»` | `Object` |
| › `silent?` | `boolean` |

#### Returns

`Promise`<[`BasilSettings`](interfaces/BasilSettings.md)\>

#### Defined in

[src/Config.ts:42](https://github.com/anatoo/basil-odm/blob/f14292c/src/Config.ts#L42)

___

### nullable

▸ **nullable**<`T`\>(`schemaLike`): `SchemaFragment`

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

[src/schema/nullable.ts:5](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/nullable.ts#L5)

___

### number

▸ **number**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/number.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/number.ts#L4)

___

### object

▸ **object**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/object.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/object.ts#L4)

___

### objectId

▸ **objectId**(): `SchemaFragment`

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/objectId.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/objectId.ts#L4)

___

### prepareDb

▸ **prepareDb**(`schema`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`DefinedSchema`](README.md#definedschema) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:51](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L51)

___

### prettier

▸ **prettier**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[src/utils.ts:78](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L78)

___

### record

▸ **record**<`T`\>(`schemaLike`): `SchemaFragment`

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

[src/schema/record.ts:5](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/record.ts#L5)

___

### setJsonSchemaValidator

▸ **setJsonSchemaValidator**(`db`, `collectionName`, `jsonSchema`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `Db` |
| `collectionName` | `string` |
| `jsonSchema` | `Record`<`string`, `unknown`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:33](https://github.com/anatoo/basil-odm/blob/f14292c/src/utils.ts#L33)

___

### shape

▸ **shape**<`T`\>(`source`): `SchemaFragment`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectSchemaSource` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/FieldsSchema.ts:38](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/FieldsSchema.ts#L38)

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

[src/schema/string.ts:4](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/string.ts#L4)

___

### union

▸ **union**(`...schemas`): `SchemaFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...schemas` | `SchemaLike`[] |

#### Returns

`SchemaFragment`

#### Defined in

[src/schema/FieldsSchema.ts:139](https://github.com/anatoo/basil-odm/blob/f14292c/src/schema/FieldsSchema.ts#L139)

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

[src/Config.ts:25](https://github.com/anatoo/basil-odm/blob/f14292c/src/Config.ts#L25)

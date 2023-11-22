[basil-odm](../README.md) / Basil

# Class: Basil

## Table of contents

### Constructors

- [constructor](Basil.md#constructor)

### Properties

- [\_mongoClient](Basil.md#_mongoclient)
- [\_queue](Basil.md#_queue)
- [\_settings](Basil.md#_settings)
- [\_timeoutIds](Basil.md#_timeoutids)

### Accessors

- [clientOptions](Basil.md#clientoptions)
- [connectionUri](Basil.md#connectionuri)
- [databaseName](Basil.md#databasename)
- [mongoClient](Basil.md#mongoclient)
- [settings](Basil.md#settings)

### Methods

- [configure](Basil.md#configure)
- [disconnect](Basil.md#disconnect)
- [flushQueue](Basil.md#flushqueue)
- [getCollection](Basil.md#getcollection)
- [getDatabase](Basil.md#getdatabase)
- [handleClose](Basil.md#handleclose)
- [isConfigured](Basil.md#isconfigured)
- [loadConfig](Basil.md#loadconfig)
- [queue](Basil.md#queue)
- [transaction](Basil.md#transaction)
- [useCollection](Basil.md#usecollection)
- [useDatabase](Basil.md#usedatabase)
- [connect](Basil.md#connect)
- [getInstance](Basil.md#getinstance)

## Constructors

### constructor

• **new Basil**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

## Properties

### \_mongoClient

• `Optional` **\_mongoClient**: `MongoClient`

#### Defined in

[src/Basil.ts:8](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L8)

___

### \_queue

• **\_queue**: `ClientCallbackQueue` = `[]`

#### Defined in

[src/Basil.ts:11](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L11)

___

### \_settings

• `Optional` **\_settings**: [`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Defined in

[src/Basil.ts:9](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L9)

___

### \_timeoutIds

• **\_timeoutIds**: `Timeout`[] = `[]`

#### Defined in

[src/Basil.ts:12](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L12)

## Accessors

### clientOptions

• `get` **clientOptions**(): `MongoClientOptions`

#### Returns

`MongoClientOptions`

#### Defined in

[src/Basil.ts:82](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L82)

___

### connectionUri

• `get` **connectionUri**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:78](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L78)

___

### databaseName

• `get` **databaseName**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:86](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L86)

___

### mongoClient

• `get` **mongoClient**(): `MongoClient`

#### Returns

`MongoClient`

#### Defined in

[src/Basil.ts:70](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L70)

___

### settings

• `get` **settings**(): [`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Returns

[`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Defined in

[src/Basil.ts:62](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L62)

## Methods

### configure

▸ **configure**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`ResolvedConfig`](../interfaces/ResolvedConfig.md) |

#### Returns

`void`

#### Defined in

[src/Basil.ts:14](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L14)

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:90](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L90)

___

### flushQueue

▸ **flushQueue**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:111](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L111)

___

### getCollection

▸ **getCollection**\<`T`\>(`collectionName`): `Promise`\<`Collection`\<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |

#### Returns

`Promise`\<`Collection`\<`T`\>\>

#### Defined in

[src/Basil.ts:156](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L156)

___

### getDatabase

▸ **getDatabase**(): `Promise`\<`Db`\>

#### Returns

`Promise`\<`Db`\>

#### Defined in

[src/Basil.ts:143](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L143)

___

### handleClose

▸ **handleClose**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:50](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L50)

___

### isConfigured

▸ **isConfigured**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Basil.ts:58](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L58)

___

### loadConfig

▸ **loadConfig**(`configPath?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:54](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L54)

___

### queue

▸ **queue**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`client`: `MongoClient`) => `void` |

#### Returns

`void`

#### Defined in

[src/Basil.ts:94](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L94)

___

### transaction

▸ **transaction**(`«destructured»`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `sessionOptions?` | `ClientSessionOptions` |
| › `transactionOptions?` | `TransactionOptions` |
| `callback` | (`session`: `ClientSession`) => `void` \| `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:29](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L29)

___

### useCollection

▸ **useCollection**\<`T`, `R`\>(`target`, `callback`): `Promise`\<`R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`unknown`\> |
| `callback` | (`collection`: `Collection`\<`T`\>) => `R` \| `Promise`\<`R`\> |

#### Returns

`Promise`\<`R`\>

#### Defined in

[src/Basil.ts:163](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L163)

___

### useDatabase

▸ **useDatabase**\<`T`\>(`callback`): `Promise`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`db`: `Db`) => `T` \| `Promise`\<`T`\> |

#### Returns

`Promise`\<`T`\>

#### Defined in

[src/Basil.ts:129](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L129)

___

### connect

▸ **connect**(`configPath?`): `Promise`\<[`Basil`](Basil.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |

#### Returns

`Promise`\<[`Basil`](Basil.md)\>

#### Defined in

[src/Basil.ts:192](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L192)

___

### getInstance

▸ **getInstance**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

#### Defined in

[src/Basil.ts:188](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Basil.ts#L188)

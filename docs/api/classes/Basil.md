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

[src/Basil.ts:8](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L8)

___

### \_queue

• **\_queue**: `ClientCallbackQueue` = `[]`

#### Defined in

[src/Basil.ts:11](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L11)

___

### \_settings

• `Optional` **\_settings**: [`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Defined in

[src/Basil.ts:9](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L9)

___

### \_timeoutIds

• **\_timeoutIds**: `Timeout`[] = `[]`

#### Defined in

[src/Basil.ts:12](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L12)

## Accessors

### clientOptions

• `get` **clientOptions**(): `MongoClientOptions`

#### Returns

`MongoClientOptions`

#### Defined in

[src/Basil.ts:83](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L83)

___

### connectionUri

• `get` **connectionUri**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:79](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L79)

___

### databaseName

• `get` **databaseName**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:87](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L87)

___

### mongoClient

• `get` **mongoClient**(): `MongoClient`

#### Returns

`MongoClient`

#### Defined in

[src/Basil.ts:71](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L71)

___

### settings

• `get` **settings**(): [`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Returns

[`ResolvedConfig`](../interfaces/ResolvedConfig.md)

#### Defined in

[src/Basil.ts:63](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L63)

## Methods

### configure

▸ **configure**(`settings`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`ResolvedConfig`](../interfaces/ResolvedConfig.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:14](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L14)

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:91](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L91)

___

### flushQueue

▸ **flushQueue**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:112](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L112)

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

[src/Basil.ts:157](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L157)

___

### getDatabase

▸ **getDatabase**(): `Promise`\<`Db`\>

#### Returns

`Promise`\<`Db`\>

#### Defined in

[src/Basil.ts:144](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L144)

___

### handleClose

▸ **handleClose**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:51](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L51)

___

### isConfigured

▸ **isConfigured**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Basil.ts:59](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L59)

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

[src/Basil.ts:55](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L55)

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

[src/Basil.ts:95](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L95)

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

[src/Basil.ts:30](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L30)

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

[src/Basil.ts:164](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L164)

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

[src/Basil.ts:130](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L130)

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

[src/Basil.ts:193](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L193)

___

### getInstance

▸ **getInstance**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

#### Defined in

[src/Basil.ts:189](https://github.com/anatoo/basil-odm/blob/5f88219/src/Basil.ts#L189)

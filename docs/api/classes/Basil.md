[basil-odm](../README.md) / Basil

# Class: Basil

## Table of contents

### Constructors

- [constructor](Basil.md#constructor)

### Properties

- [\_client](Basil.md#_client)
- [\_queue](Basil.md#_queue)
- [\_settings](Basil.md#_settings)
- [\_timeoutIds](Basil.md#_timeoutids)

### Accessors

- [client](Basil.md#client)
- [clientOptions](Basil.md#clientoptions)
- [connectionUri](Basil.md#connectionuri)
- [databaseName](Basil.md#databasename)
- [settings](Basil.md#settings)

### Methods

- [configure](Basil.md#configure)
- [disconnect](Basil.md#disconnect)
- [flushQueue](Basil.md#flushqueue)
- [getDatabase](Basil.md#getdatabase)
- [handleClose](Basil.md#handleclose)
- [isConfigured](Basil.md#isconfigured)
- [loadConfig](Basil.md#loadconfig)
- [queue](Basil.md#queue)
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

### \_client

• `Optional` **\_client**: `MongoClient`

#### Defined in

[src/Basil.ts:8](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L8)

___

### \_queue

• **\_queue**: `ClientCallbackQueue` = `[]`

#### Defined in

[src/Basil.ts:11](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L11)

___

### \_settings

• `Optional` **\_settings**: [`BasilSettings`](../interfaces/BasilSettings.md)

#### Defined in

[src/Basil.ts:9](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L9)

___

### \_timeoutIds

• **\_timeoutIds**: `Timeout`[] = `[]`

#### Defined in

[src/Basil.ts:12](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L12)

## Accessors

### client

• `get` **client**(): `MongoClient`

#### Returns

`MongoClient`

#### Defined in

[src/Basil.ts:49](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L49)

___

### clientOptions

• `get` **clientOptions**(): `MongoClientOptions`

#### Returns

`MongoClientOptions`

#### Defined in

[src/Basil.ts:61](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L61)

___

### connectionUri

• `get` **connectionUri**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:57](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L57)

___

### databaseName

• `get` **databaseName**(): `string`

#### Returns

`string`

#### Defined in

[src/Basil.ts:65](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L65)

___

### settings

• `get` **settings**(): [`BasilSettings`](../interfaces/BasilSettings.md)

#### Returns

[`BasilSettings`](../interfaces/BasilSettings.md)

#### Defined in

[src/Basil.ts:41](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L41)

## Methods

### configure

▸ **configure**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`BasilSettings`](../interfaces/BasilSettings.md) |

#### Returns

`void`

#### Defined in

[src/Basil.ts:14](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L14)

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/Basil.ts:69](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L69)

___

### flushQueue

▸ **flushQueue**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:88](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L88)

___

### getDatabase

▸ **getDatabase**(): `Promise`\<`Db`\>

#### Returns

`Promise`\<`Db`\>

#### Defined in

[src/Basil.ts:120](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L120)

___

### handleClose

▸ **handleClose**(): `void`

#### Returns

`void`

#### Defined in

[src/Basil.ts:29](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L29)

___

### isConfigured

▸ **isConfigured**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Basil.ts:37](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L37)

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

[src/Basil.ts:33](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L33)

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

[src/Basil.ts:73](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L73)

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

[src/Basil.ts:133](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L133)

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

[src/Basil.ts:106](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L106)

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

[src/Basil.ts:159](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L159)

___

### getInstance

▸ **getInstance**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

#### Defined in

[src/Basil.ts:155](https://github.com/anatoo/basil-odm/blob/5373178/src/Basil.ts#L155)

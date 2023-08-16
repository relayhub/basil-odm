[basil-odm](../README.md) / Base

# Class: Base

## Table of contents

### Constructors

- [constructor](Base.md#constructor)

### Methods

- [aggregate](Base.md#aggregate)
- [count](Base.md#count)
- [deleteMany](Base.md#deletemany)
- [deleteOne](Base.md#deleteone)
- [findById](Base.md#findbyid)
- [findByIds](Base.md#findbyids)
- [findMany](Base.md#findmany)
- [findOne](Base.md#findone)
- [getBasil](Base.md#getbasil)
- [getCollection](Base.md#getcollection)
- [insertOne](Base.md#insertone)
- [save](Base.md#save)
- [updateMany](Base.md#updatemany)
- [updateOne](Base.md#updateone)

## Constructors

### constructor

• **new Base**()

## Methods

### aggregate

▸ `Static` **aggregate**<`T`\>(`this`, `pipeline`, `options?`): `Promise`<`unknown`[]\>

Performs aggregate operations on collections.

Since the execution result will be an array of unknown type, it is recommended to use a validation library such as [zod](https://zod.dev) to verify the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> | - |
| `pipeline` | `Document`[] | Pipeline array to be passed to aggregate operation |
| `options` | `AggregateOptions` |  |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[src/Base.ts:96](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L96)

___

### count

▸ `Static` **count**<`T`\>(`this`, `params?`): `Promise`<`number`\>

Gets the number of documents matching the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `params` | [`CountParams`](../interfaces/CountParams.md)<`T`\> |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/Base.ts:217](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L217)

___

### deleteMany

▸ `Static` **deleteMany**<`T`\>(`this`, `filter`, `options?`): `Promise`<`DeleteResult`\>

Delete documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`<`DeleteResult`\>

#### Defined in

[src/Base.ts:189](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L189)

___

### deleteOne

▸ `Static` **deleteOne**<`T`\>(`this`, `filter`, `options?`): `Promise`<`DeleteResult`\>

Delete the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`<`DeleteResult`\>

#### Defined in

[src/Base.ts:176](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L176)

___

### findById

▸ `Static` **findById**<`T`\>(`this`, `id`, `options?`): `Promise`<``null`` \| `T`\>

Find a document matched by `_id`. Returns null if the document is not found.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `id` | `string` \| `ObjectId` |
| `options` | `FindOptions`<`T`\> |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/Base.ts:43](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L43)

___

### findByIds

▸ `Static` **findByIds**<`T`\>(`this`, `ids`, `options?`): `Promise`<`T`[]\>

Finds documents matching an array of ids.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> | - |
| `ids` | readonly (`string` \| `ObjectId`)[] | array of ObjectId or string |
| `options` | [`FindByIdsOptions`](../README.md#findbyidsoptions)<`T`\> | optional. |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/Base.ts:67](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L67)

___

### findMany

▸ `Static` **findMany**<`T`\>(`this`, `filter`, `options?`): `Promise`<`T`[]\>

Fetches documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `FindOptions`<`T`\> |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/Base.ts:128](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L128)

___

### findOne

▸ `Static` **findOne**<`T`\>(`this`, `filter`, `options?`): `Promise`<``null`` \| `T`\>

Fetches the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `FindOptions`<`T`\> |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/Base.ts:109](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L109)

___

### getBasil

▸ `Static` **getBasil**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

#### Defined in

[src/Base.ts:22](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L22)

___

### getCollection

▸ `Static` **getCollection**(): [`EntityMeta`](../README.md#entitymeta)<`unknown`\>

#### Returns

[`EntityMeta`](../README.md#entitymeta)<`unknown`\>

#### Defined in

[src/Base.ts:29](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L29)

___

### insertOne

▸ `Static` **insertOne**<`T`\>(`this`, `entity`, `options?`): `Promise`<`InsertOneResult`<`WithId`<`T`\>\>\>

Inserts a passed entity into the collection.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `entity` | `T` |
| `options` | `InsertOneOptions` |

#### Returns

`Promise`<`InsertOneResult`<`WithId`<`T`\>\>\>

#### Defined in

[src/Base.ts:202](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L202)

___

### save

▸ `Static` **save**<`T`\>(`this`, `entity`, `options?`): `Promise`<`Document` \| `UpdateResult`<`Document`\>\>

Save changes to a document persisted in the collection.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `entity` | `T` |
| `options` | `ReplaceOptions` |

#### Returns

`Promise`<`Document` \| `UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:147](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L147)

___

### updateMany

▸ `Static` **updateMany**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`Document` \| `UpdateResult`<`Document`\>\>

Update multiple documents in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `update` | `UpdateFilter`<`T`\> |
| `options` | `UpdateOptions` |

#### Returns

`Promise`<`Document` \| `UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:230](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L230)

___

### updateOne

▸ `Static` **updateOne**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`UpdateResult`<`Document`\>\>

Update a single document in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `update` | `UpdateFilter`<`T`\> \| `Partial`<`T`\> |
| `options` | `UpdateOptions` |

#### Returns

`Promise`<`UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:248](https://github.com/anatoo/basil-odm/blob/f14292c/src/Base.ts#L248)

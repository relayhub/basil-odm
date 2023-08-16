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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `pipeline` | `Document`[] |
| `options` | `AggregateOptions` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[src/Base.ts:66](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L66)

___

### count

▸ `Static` **count**<`T`\>(`this`, `params?`): `Promise`<`number`\>

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

[src/Base.ts:145](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L145)

___

### deleteMany

▸ `Static` **deleteMany**<`T`\>(`this`, `filter`, `options?`): `Promise`<`DeleteResult`\>

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

[src/Base.ts:128](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L128)

___

### deleteOne

▸ `Static` **deleteOne**<`T`\>(`this`, `filter`, `options?`): `Promise`<`DeleteResult`\>

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

[src/Base.ts:121](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L121)

___

### findById

▸ `Static` **findById**<`T`\>(`this`, `id`, `options?`): `Promise`<``null`` \| `T`\>

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

[src/Base.ts:28](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L28)

___

### findByIds

▸ `Static` **findByIds**<`T`\>(`this`, `ids`, `options?`): `Promise`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`EntityClass`](../interfaces/EntityClass.md)<`T`\> |
| `ids` | readonly (`string` \| `ObjectId`)[] |
| `options` | [`FindByIdsOptions`](../README.md#findbyidsoptions)<`T`\> |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/Base.ts:45](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L45)

___

### findMany

▸ `Static` **findMany**<`T`\>(`this`, `filter`, `options?`): `Promise`<`T`[]\>

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

[src/Base.ts:86](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L86)

___

### findOne

▸ `Static` **findOne**<`T`\>(`this`, `filter`, `options?`): `Promise`<``null`` \| `T`\>

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

[src/Base.ts:73](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L73)

___

### getBasil

▸ `Static` **getBasil**(): [`Basil`](Basil.md)

#### Returns

[`Basil`](Basil.md)

#### Defined in

[src/Base.ts:16](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L16)

___

### getCollection

▸ `Static` **getCollection**(): [`EntityMeta`](../README.md#entitymeta)<`unknown`\>

#### Returns

[`EntityMeta`](../README.md#entitymeta)<`unknown`\>

#### Defined in

[src/Base.ts:20](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L20)

___

### insertOne

▸ `Static` **insertOne**<`T`\>(`this`, `entity`, `options?`): `Promise`<`InsertOneResult`<`WithId`<`T`\>\>\>

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

[src/Base.ts:135](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L135)

___

### save

▸ `Static` **save**<`T`\>(`this`, `entity`, `options?`): `Promise`<`Document` \| `UpdateResult`<`Document`\>\>

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

[src/Base.ts:98](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L98)

___

### updateMany

▸ `Static` **updateMany**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`Document` \| `UpdateResult`<`Document`\>\>

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

[src/Base.ts:151](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L151)

___

### updateOne

▸ `Static` **updateOne**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`UpdateResult`<`Document`\>\>

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

[src/Base.ts:162](https://github.com/anatoo/basil-odm/blob/5a6ae65/src/Base.ts#L162)

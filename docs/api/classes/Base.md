[basil-odm](../README.md) / Base

# Class: Base

## Table of contents

### Constructors

- [constructor](Base.md#constructor)

### Properties

- [basil](Base.md#basil)

### Methods

- [aggregate](Base.md#aggregate)
- [count](Base.md#count)
- [deleteMany](Base.md#deletemany)
- [deleteOne](Base.md#deleteone)
- [findById](Base.md#findbyid)
- [findByIds](Base.md#findbyids)
- [findMany](Base.md#findmany)
- [findOne](Base.md#findone)
- [getRuntimeSchema](Base.md#getruntimeschema)
- [insertOne](Base.md#insertone)
- [loadEdges](Base.md#loadedges)
- [save](Base.md#save)
- [updateMany](Base.md#updatemany)
- [updateOne](Base.md#updateone)

## Constructors

### constructor

• **new Base**(): [`Base`](Base.md)

#### Returns

[`Base`](Base.md)

## Properties

### basil

▪ `Static` **basil**: [`Basil`](Basil.md) = `basil`

#### Defined in

[src/Base.ts:19](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L19)

## Methods

### aggregate

▸ **aggregate**\<`T`\>(`this`, `pipeline`, `options?`): `Promise`\<`unknown`[]\>

Performs aggregate operations on collections.

Since the execution result will be an array of unknown type, it is recommended to use a validation library such as [zod](https://zod.dev) to verify the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `pipeline` | `Document`[] | Pipeline array to be passed to aggregate operation |
| `options` | `AggregateOptions` |  |

#### Returns

`Promise`\<`unknown`[]\>

#### Defined in

[src/Base.ts:164](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L164)

___

### count

▸ **count**\<`T`\>(`this`, `filter?`, `options?`): `Promise`\<`number`\>

Gets the number of documents matching the filter.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `filter` | `Filter`\<`T`\> | The filter for the count |
| `options` | `CountDocumentsOptions` | Optional settings for the command |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/Base.ts:283](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L283)

___

### deleteMany

▸ **deleteMany**\<`T`\>(`this`, `filter`, `options?`): `Promise`\<`DeleteResult`\>

Delete documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> |
| `filter` | `Filter`\<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[src/Base.ts:255](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L255)

___

### deleteOne

▸ **deleteOne**\<`T`\>(`this`, `filter`, `options?`): `Promise`\<`DeleteResult`\>

Delete the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> |
| `filter` | `Filter`\<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[src/Base.ts:242](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L242)

___

### findById

▸ **findById**\<`T`\>(`this`, `id`, `options?`): `Promise`\<``null`` \| `T`\>

Returns a document matching the passed id value. The id value is used to match the `_id` field.
Returns null if the document is not found.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `id` | `string` \| `ObjectId` |  |
| `options` | `FindOptions`\<`T`\> | Same value as the option passed to `findOne()` |

#### Returns

`Promise`\<``null`` \| `T`\>

#### Defined in

[src/Base.ts:111](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L111)

___

### findByIds

▸ **findByIds**\<`T`\>(`this`, `ids`, `options?`): `Promise`\<`T`[]\>

Finds documents matching an array of ids.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `ids` | readonly (`string` \| `ObjectId`)[] | An array of ObjectId or string |
| `options` | [`FindByIdsOptions`](../README.md#findbyidsoptions)\<`T`\> |  |

#### Returns

`Promise`\<`T`[]\>

#### Defined in

[src/Base.ts:135](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L135)

___

### findMany

▸ **findMany**\<`T`\>(`this`, `filter`, `options?`): `Promise`\<`T`[]\>

Fetches documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `filter` | `Filter`\<`T`\> | The filter used to select the document |
| `options` | `FindOptions`\<`T`\> |  |

#### Returns

`Promise`\<`T`[]\>

#### Defined in

[src/Base.ts:198](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L198)

___

### findOne

▸ **findOne**\<`T`\>(`this`, `filter`, `options?`): `Promise`\<``null`` \| `T`\>

Fetches the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> |
| `filter` | `Filter`\<`T`\> |
| `options` | `FindOptions`\<`T`\> |

#### Returns

`Promise`\<``null`` \| `T`\>

#### Defined in

[src/Base.ts:177](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L177)

___

### getRuntimeSchema

▸ **getRuntimeSchema**(): [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`unknown`, `unknown`\>

#### Returns

[`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`unknown`, `unknown`\>

#### Defined in

[src/Base.ts:24](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L24)

___

### insertOne

▸ **insertOne**\<`T`\>(`this`, `entity`, `options?`): `Promise`\<`InsertOneResult`\<`WithId`\<`T`\>\>\>

Inserts a passed entity into the collection.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> |
| `entity` | `T` |
| `options` | `InsertOneOptions` |

#### Returns

`Promise`\<`InsertOneResult`\<`WithId`\<`T`\>\>\>

#### Defined in

[src/Base.ts:268](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L268)

___

### loadEdges

▸ **loadEdges**\<`Entity`, `Edges`, `EdgeKey`\>(`this`, `objects`, `edges`): `Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | `Entity` |
| `Edges` | `Edges` |
| `EdgeKey` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`Entity`, `Edges`\> |
| `objects` | `Entity`[] |
| `edges` | `Record`\<`EdgeKey`, ``true``\> |

#### Returns

`Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Defined in

[src/Base.ts:32](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L32)

___

### save

▸ **save**\<`T`\>(`this`, `entity`, `options?`): `Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

Save changes to a document persisted in the collection.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> |
| `entity` | `T` |
| `options` | `ReplaceOptions` |

#### Returns

`Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

#### Defined in

[src/Base.ts:217](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L217)

___

### updateMany

▸ **updateMany**\<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

Update multiple documents in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `filter` | `Filter`\<`T`\> | The filter used to select the documents to update |
| `update` | `UpdateFilter`\<`T`\> | The update operations to be applied to the documents |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

#### Defined in

[src/Base.ts:296](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L296)

___

### updateOne

▸ **updateOne**\<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`\<`UpdateResult`\<`Document`\>\>

Update a single document in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)\<`T`, `unknown`\> | - |
| `filter` | `Filter`\<`T`\> | The filter used to select the document to update |
| `update` | `UpdateFilter`\<`T`\> \| `Partial`\<`T`\> | The update operations to be applied to the document |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`\<`UpdateResult`\<`Document`\>\>

#### Defined in

[src/Base.ts:314](https://github.com/anatoo/basil-odm/blob/5373178/src/Base.ts#L314)

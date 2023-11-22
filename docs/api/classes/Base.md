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

[src/Base.ts:20](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L20)

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

[src/Base.ts:100](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L100)

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

[src/Base.ts:252](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L252)

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

[src/Base.ts:216](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L216)

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

[src/Base.ts:199](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L199)

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

[src/Base.ts:40](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L40)

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
| `options` | `FindByIdsOptions`\<`T`\> |  |

#### Returns

`Promise`\<`T`[]\>

#### Defined in

[src/Base.ts:67](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L67)

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

[src/Base.ts:142](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L142)

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

[src/Base.ts:117](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L117)

___

### getRuntimeSchema

▸ **getRuntimeSchema**(): [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`unknown`, `unknown`\>

#### Returns

[`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`unknown`, `unknown`\>

#### Defined in

[src/Base.ts:25](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L25)

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

[src/Base.ts:233](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L233)

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

[src/Base.ts:165](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L165)

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

[src/Base.ts:269](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L269)

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

[src/Base.ts:287](https://github.com/anatoo/basil-odm/blob/15cf09f/src/Base.ts#L287)

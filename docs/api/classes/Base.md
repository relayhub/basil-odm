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

• **new Base**()

## Properties

### basil

▪ `Static` **basil**: [`Basil`](Basil.md) = `basil`

#### Defined in

[src/Base.ts:18](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L18)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `pipeline` | `Document`[] | Pipeline array to be passed to aggregate operation |
| `options` | `AggregateOptions` |  |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[src/Base.ts:91](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L91)

___

### count

▸ `Static` **count**<`T`\>(`this`, `filter?`, `options?`): `Promise`<`number`\>

Gets the number of documents matching the filter.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `filter` | `Filter`<`T`\> | The filter for the count |
| `options` | `CountDocumentsOptions` | Optional settings for the command |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/Base.ts:210](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L210)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`<`DeleteResult`\>

#### Defined in

[src/Base.ts:182](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L182)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`<`DeleteResult`\>

#### Defined in

[src/Base.ts:169](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L169)

___

### findById

▸ `Static` **findById**<`T`\>(`this`, `id`, `options?`): `Promise`<``null`` \| `T`\>

Returns a document matching the passed id value. The id value is used to match the `_id` field.
Returns null if the document is not found.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `id` | `string` \| `ObjectId` |  |
| `options` | `FindOptions`<`T`\> | Same value as the option passed to `findOne()` |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/Base.ts:38](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L38)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `ids` | readonly (`string` \| `ObjectId`)[] | An array of ObjectId or string |
| `options` | [`FindByIdsOptions`](../README.md#findbyidsoptions)<`T`\> |  |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/Base.ts:62](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L62)

___

### findMany

▸ `Static` **findMany**<`T`\>(`this`, `filter`, `options?`): `Promise`<`T`[]\>

Fetches documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Document` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `filter` | `Filter`<`T`\> | The filter used to select the document |
| `options` | `FindOptions`<`T`\> |  |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/Base.ts:125](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L125)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> |
| `filter` | `Filter`<`T`\> |
| `options` | `FindOptions`<`T`\> |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/Base.ts:104](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L104)

___

### getRuntimeSchema

▸ `Static` **getRuntimeSchema**(): [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)<`unknown`\>

#### Returns

[`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)<`unknown`\>

#### Defined in

[src/Base.ts:23](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L23)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> |
| `entity` | `T` |
| `options` | `InsertOneOptions` |

#### Returns

`Promise`<`InsertOneResult`<`WithId`<`T`\>\>\>

#### Defined in

[src/Base.ts:195](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L195)

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
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> |
| `entity` | `T` |
| `options` | `ReplaceOptions` |

#### Returns

`Promise`<`Document` \| `UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:144](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L144)

___

### updateMany

▸ `Static` **updateMany**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`Document` \| `UpdateResult`<`Document`\>\>

Update multiple documents in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `filter` | `Filter`<`T`\> | The filter used to select the documents to update |
| `update` | `UpdateFilter`<`T`\> | The update operations to be applied to the documents |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`<`Document` \| `UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:223](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L223)

___

### updateOne

▸ `Static` **updateOne**<`T`\>(`this`, `filter`, `update`, `options?`): `Promise`<`UpdateResult`<`Document`\>\>

Update a single document in a collection.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`BaseClass`](../README.md#baseclass)<`T`\> | - |
| `filter` | `Filter`<`T`\> | The filter used to select the document to update |
| `update` | `UpdateFilter`<`T`\> \| `Partial`<`T`\> | The update operations to be applied to the document |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`<`UpdateResult`<`Document`\>\>

#### Defined in

[src/Base.ts:241](https://github.com/anatoo/basil-odm/blob/b49f36c/src/Base.ts#L241)

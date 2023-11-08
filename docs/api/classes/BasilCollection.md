[basil-odm](../README.md) / BasilCollection

# Class: BasilCollection\<Entity, Edges\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `Object` |
| `Edges` | `Edges` |

## Table of contents

### Constructors

- [constructor](BasilCollection.md#constructor)

### Properties

- [basil](BasilCollection.md#basil)
- [getRuntimeSchema](BasilCollection.md#getruntimeschema)

### Methods

- [aggregate](BasilCollection.md#aggregate)
- [count](BasilCollection.md#count)
- [deleteMany](BasilCollection.md#deletemany)
- [deleteOne](BasilCollection.md#deleteone)
- [findById](BasilCollection.md#findbyid)
- [findByIds](BasilCollection.md#findbyids)
- [findMany](BasilCollection.md#findmany)
- [findOne](BasilCollection.md#findone)
- [insertOne](BasilCollection.md#insertone)
- [loadEdges](BasilCollection.md#loadedges)
- [save](BasilCollection.md#save)
- [updateMany](BasilCollection.md#updatemany)
- [updateOne](BasilCollection.md#updateone)

## Constructors

### constructor

• **new BasilCollection**\<`Entity`, `Edges`\>(`getRuntimeSchema`): [`BasilCollection`](BasilCollection.md)\<`Entity`, `Edges`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `Object` |
| `Edges` | `Edges` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getRuntimeSchema` | () => [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\> |

#### Returns

[`BasilCollection`](BasilCollection.md)\<`Entity`, `Edges`\>

#### Defined in

[src/BasilCollection.ts:17](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L17)

## Properties

### basil

• **basil**: [`Basil`](Basil.md) = `basil`

#### Defined in

[src/BasilCollection.ts:10](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L10)

___

### getRuntimeSchema

• `Readonly` **getRuntimeSchema**: () => [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

#### Type declaration

▸ (): [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

##### Returns

[`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

#### Defined in

[src/BasilCollection.ts:15](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L15)

## Methods

### aggregate

▸ **aggregate**(`pipeline`, `options?`): `Promise`\<`unknown`[]\>

Performs aggregate operations on collections.

Since the execution result will be an array of unknown type, it is recommended to use a validation library such as [zod](https://zod.dev) to verify the result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pipeline` | `Document`[] | Pipeline array to be passed to aggregate operation |
| `options` | `AggregateOptions` |  |

#### Returns

`Promise`\<`unknown`[]\>

#### Defined in

[src/BasilCollection.ts:157](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L157)

___

### count

▸ **count**(`filter?`, `options?`): `Promise`\<`number`\>

Gets the number of documents matching the filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`\<`Entity`\> | The filter for the count |
| `options` | `CountDocumentsOptions` | Optional settings for the command |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/BasilCollection.ts:283](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L283)

___

### deleteMany

▸ **deleteMany**(`filter`, `options?`): `Promise`\<`DeleteResult`\>

Delete documents that matches the filter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter`\<`Entity`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[src/BasilCollection.ts:255](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L255)

___

### deleteOne

▸ **deleteOne**\<`Entity`\>(`filter`, `options?`): `Promise`\<`DeleteResult`\>

Delete the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter`\<`Entity`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[src/BasilCollection.ts:242](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L242)

___

### findById

▸ **findById**(`id`, `options?`): `Promise`\<``null`` \| `Entity`\>

Returns a document matching the passed id value. The id value is used to match the `_id` field.
Returns null if the document is not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `ObjectId` |  |
| `options` | `FindOptions`\<`Entity`\> | Same value as the option passed to `findOne()` |

#### Returns

`Promise`\<``null`` \| `Entity`\>

#### Defined in

[src/BasilCollection.ts:94](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L94)

___

### findByIds

▸ **findByIds**(`ids`, `options?`): `Promise`\<`Entity`[]\>

Finds documents matching an array of ids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | readonly (`string` \| `ObjectId`)[] | An array of ObjectId or string |
| `options` | `FindByIdsOptions`\<`Entity`\> |  |

#### Returns

`Promise`\<`Entity`[]\>

#### Defined in

[src/BasilCollection.ts:122](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L122)

___

### findMany

▸ **findMany**\<`Entity`\>(`filter`, `options?`): `Promise`\<`Entity`[]\>

Fetches documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `Document` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`\<`Entity`\> | The filter used to select the document |
| `options` | `FindOptions`\<`Entity`\> |  |

#### Returns

`Promise`\<`Entity`[]\>

#### Defined in

[src/BasilCollection.ts:194](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L194)

___

### findOne

▸ **findOne**(`filter`, `options?`): `Promise`\<``null`` \| `Entity`\>

Fetches the first document that matches the filter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter`\<`Entity`\> |
| `options` | `FindOptions`\<`Entity`\> |

#### Returns

`Promise`\<``null`` \| `Entity`\>

#### Defined in

[src/BasilCollection.ts:169](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L169)

___

### insertOne

▸ **insertOne**(`entity`, `options?`): `Promise`\<`InsertOneResult`\<`WithId`\<`Entity`\>\>\>

Inserts a passed entity into the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `Entity` |
| `options` | `InsertOneOptions` |

#### Returns

`Promise`\<`InsertOneResult`\<`WithId`\<`Entity`\>\>\>

#### Defined in

[src/BasilCollection.ts:267](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L267)

___

### loadEdges

▸ **loadEdges**(`objects`, `edges`): `Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | `Entity`[] |
| `edges` | \{ [key in string \| number \| symbol]: true } |

#### Returns

`Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Defined in

[src/BasilCollection.ts:21](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L21)

___

### save

▸ **save**(`entity`, `options?`): `Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

Save changes to a document persisted in the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `Entity` |
| `options` | `ReplaceOptions` |

#### Returns

`Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

#### Defined in

[src/BasilCollection.ts:217](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L217)

___

### updateMany

▸ **updateMany**(`filter`, `update`, `options?`): `Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

Update multiple documents in a collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`\<`Entity`\> | The filter used to select the documents to update |
| `update` | `UpdateFilter`\<`Entity`\> | The update operations to be applied to the documents |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`\<`Document` \| `UpdateResult`\<`Document`\>\>

#### Defined in

[src/BasilCollection.ts:296](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L296)

___

### updateOne

▸ **updateOne**(`filter`, `update`, `options?`): `Promise`\<`UpdateResult`\<`Document`\>\>

Update a single document in a collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`\<`Entity`\> | The filter used to select the document to update |
| `update` | `UpdateFilter`\<`Entity`\> \| `Partial`\<`Entity`\> | The update operations to be applied to the document |
| `options` | `UpdateOptions` | Optional settings for the command |

#### Returns

`Promise`\<`UpdateResult`\<`Document`\>\>

#### Defined in

[src/BasilCollection.ts:309](https://github.com/anatoo/basil-odm/blob/5373178/src/BasilCollection.ts#L309)

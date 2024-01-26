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

- [\_loadEdges](BasilCollection.md#_loadedges)
- [aggregate](BasilCollection.md#aggregate)
- [count](BasilCollection.md#count)
- [deleteMany](BasilCollection.md#deletemany)
- [deleteOne](BasilCollection.md#deleteone)
- [findById](BasilCollection.md#findbyid)
- [findByIds](BasilCollection.md#findbyids)
- [findMany](BasilCollection.md#findmany)
- [findOne](BasilCollection.md#findone)
- [getMongoCollection](BasilCollection.md#getmongocollection)
- [insertMany](BasilCollection.md#insertmany)
- [insertOne](BasilCollection.md#insertone)
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

[src/BasilCollection.ts:15](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L15)

## Properties

### basil

• **basil**: [`Basil`](Basil.md) = `basil`

#### Defined in

[src/BasilCollection.ts:8](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L8)

___

### getRuntimeSchema

• `Readonly` **getRuntimeSchema**: () => [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

#### Type declaration

▸ (): [`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

##### Returns

[`RuntimeCollectionSchema`](../README.md#runtimecollectionschema)\<`Entity`, `Edges`\>

#### Defined in

[src/BasilCollection.ts:13](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L13)

## Methods

### \_loadEdges

▸ **_loadEdges**\<`Key`\>(`objects`, `options`): `Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` = `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | `Entity`[] |
| `options` | [`EdgesOptions`](../README.md#edgesoptions)\<\{ [key in string \| number \| symbol]: Edges[key] }, `Entity`\> |

#### Returns

`Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Defined in

[src/BasilCollection.ts:20](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L20)

___

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

[src/BasilCollection.ts:210](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L210)

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

[src/BasilCollection.ts:395](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L395)

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

[src/BasilCollection.ts:343](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L343)

___

### deleteOne

▸ **deleteOne**(`filter`, `options?`): `Promise`\<`DeleteResult`\>

Delete the first document that matches the filter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter`\<`Entity`\> |
| `options` | `DeleteOptions` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[src/BasilCollection.ts:328](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L328)

___

### findById

▸ **findById**\<`Key`\>(`id`, `options?`): `Promise`\<``null`` \| `Entity` & \{ [key in string \| number \| symbol]: Edges[key] }\>

Returns a document matching the passed id value. The id value is used to match the `_id` field.
Returns null if the document is not found.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` = `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `ObjectId` |  |
| `options` | `Partial`\<[`EdgesOptions`](../README.md#edgesoptions)\<\{ [key in string \| number \| symbol]: Edges[key] }, `Entity`\>\> & `FindOptions`\<`Entity`\> | Same value as the option passed to `findOne()` |

#### Returns

`Promise`\<``null`` \| `Entity` & \{ [key in string \| number \| symbol]: Edges[key] }\>

#### Defined in

[src/BasilCollection.ts:126](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L126)

___

### findByIds

▸ **findByIds**\<`Key`\>(`ids`, `options?`): `Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

Finds documents matching an array of ids.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` = `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | readonly (`string` \| `ObjectId`)[] | An array of ObjectId or string |
| `options` | `Partial`\<[`EdgesOptions`](../README.md#edgesoptions)\<\{ [key in string \| number \| symbol]: Edges[key] }, `Entity`\>\> & `FindOptions`\<`Entity`\> & \{ `filter?`: `Filter`\<`Entity`\>  } |  |

#### Returns

`Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Defined in

[src/BasilCollection.ts:169](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L169)

___

### findMany

▸ **findMany**\<`Key`\>(`filter`, `options?`): `Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

Fetches documents that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` = `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`\<`Entity`\> | The filter used to select the document |
| `options` | `Partial`\<[`EdgesOptions`](../README.md#edgesoptions)\<\{ [key in string \| number \| symbol]: Edges[key] }, `Entity`\>\> & `FindOptions`\<`Entity`\> |  |

#### Returns

`Promise`\<`Entity` & \{ [key in string \| number \| symbol]: Edges[key] }[]\>

#### Defined in

[src/BasilCollection.ts:263](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L263)

___

### findOne

▸ **findOne**\<`Key`\>(`filter`, `options?`): `Promise`\<``null`` \| `Entity` & \{ [key in string \| number \| symbol]: Edges[key] }\>

Fetches the first document that matches the filter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` = `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter`\<`Entity`\> |
| `options` | `Partial`\<[`EdgesOptions`](../README.md#edgesoptions)\<\{ [key in string \| number \| symbol]: Edges[key] }, `Entity`\>\> & `FindOptions`\<`Entity`\> |

#### Returns

`Promise`\<``null`` \| `Entity` & \{ [key in string \| number \| symbol]: Edges[key] }\>

#### Defined in

[src/BasilCollection.ts:224](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L224)

___

### getMongoCollection

▸ **getMongoCollection**(): `Promise`\<`Collection`\<`Entity`\>\>

Returns a collection object.

#### Returns

`Promise`\<`Collection`\<`Entity`\>\>

MongoDB native driver's collection object

#### Defined in

[src/BasilCollection.ts:290](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L290)

___

### insertMany

▸ **insertMany**(`entities`, `options?`): `Promise`\<`InsertManyResult`\<`Entity`\>\>

Inserts passed entities into the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `Entity`[] |
| `options` | `BulkWriteOptions` |

#### Returns

`Promise`\<`InsertManyResult`\<`Entity`\>\>

#### Defined in

[src/BasilCollection.ts:377](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L377)

___

### insertOne

▸ **insertOne**(`entity`, `options?`): `Promise`\<`InsertOneResult`\<`Entity`\>\>

Inserts a passed entity into the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `Entity` |
| `options` | `InsertOneOptions` |

#### Returns

`Promise`\<`InsertOneResult`\<`Entity`\>\>

#### Defined in

[src/BasilCollection.ts:357](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L357)

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

[src/BasilCollection.ts:301](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L301)

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

[src/BasilCollection.ts:407](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L407)

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

[src/BasilCollection.ts:423](https://github.com/anatoo/basil-odm/blob/5f88219/src/BasilCollection.ts#L423)

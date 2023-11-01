import { collection, objectId, date, string, index, hasOne } from '../../src';
export const BlogEntries = collection({
  collectionName: 'blogEntries',
  fields: {
    _id: objectId,
    title: string,
    content: string,
    createdAt: date,
    userId: objectId,
  },
  edges: {
    user: hasOne({
      collection: 'users',
      referenceField: 'userId',
    }),
  },
  indexes: [index({ createdAt: -1 })],
});

export const Users = collection({
  collectionName: 'users',
  fields: {
    _id: objectId,
    name: string,
  },
});

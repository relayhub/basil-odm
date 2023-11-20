import { collection, objectId, date, string, index, hasOne, enums, hasMany } from '../../src';
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
    status: enums({
      name: 'UserStatus',
      values: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
      },
    }),
  },
  edges: {
    blogEntries: hasMany({
      collection: 'blogEntries',
      referenceField: 'userId',
    }),
  },
});

export type Edge = HasOne;

export type HasOne = {
  type: 'hasOne';
  collection: string;
  referenceField: string;
};

export type Edge = HasOne | HasMany;

export type HasOne = {
  type: 'hasOne';
  collection: string;
  referenceField: string;
};

export type HasMany = {
  type: 'hasMany';
  collection: string;
  referenceField: string;
};

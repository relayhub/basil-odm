import { HasOne, HasMany } from './edgeTypes';

export function hasOne(props: Omit<HasOne, 'type'>): HasOne {
  return {
    type: 'hasOne',
    ...props,
  };
}

export function hasMany(props: Omit<HasMany, 'type'>): HasMany {
  return {
    type: 'hasMany',
    ...props,
  };
}

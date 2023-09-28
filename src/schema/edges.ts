import { HasOne } from './edgeTypes';

export function hasOne(props: Omit<HasOne, 'type'>): HasOne {
  return {
    type: 'hasOne',
    ...props,
  };
}

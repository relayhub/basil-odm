import { hasOne } from './edges';

describe('hasOne()', () => {
  it('should works normally', () => {
    const edge = hasOne({
      collection: 'foobar',
      referenceField: 'foobarId',
    });

    expect(edge).toBeTruthy();
  });
});

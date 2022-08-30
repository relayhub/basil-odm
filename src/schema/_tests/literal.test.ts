import {literal} from '../literal';

test('literal()', () => {
  expect(literal('foobar').buildASTNode()).toEqual({
    kind: 'literal',
    value: 'foobar',
  });
});

import {index} from '../utils';

test('index()', () => {
  expect(index({id: -1})).toEqual({fields: {id: -1}, options: {}});
});

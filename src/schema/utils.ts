import { inspect } from 'util';
import { SchemaFragment, SchemaFragmentAggregate, SchemaLike } from './types';
import { literal } from './literal';
import { getSchemaFragmentSymbol, schemaFragmentFrag } from './symbols';

export function getSchemaFragment(target: SchemaLike): SchemaFragment {
  if (target === undefined) {
    throw TypeError(`Can't create schema fragment from undefined value.`);
  }

  if (target === null || typeof target === 'string' || typeof target === 'number' || typeof target === 'boolean') {
    return literal(target);
  }

  if (isSchemaFragment(target)) {
    return target;
  }

  if ((target as SchemaFragmentAggregate)[getSchemaFragmentSymbol] instanceof Function) {
    return (target as SchemaFragmentAggregate)[getSchemaFragmentSymbol]();
  }

  throw TypeError(`Can't create schema fragment from "${inspect(target)}".`);
}

function isSchemaFragment(schemaFragment: unknown): schemaFragment is SchemaFragment {
  return !!(schemaFragment as SchemaFragment)[schemaFragmentFrag];
}

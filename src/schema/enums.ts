import { schemaFragmentFrag } from './symbols';
import { SchemaFragment } from './types';
import { inspect } from 'util';

export function enums(props: { values: Record<string, Value> | Record<number, Value> }): SchemaFragment {
  const { values } = props;

  return new Enum({
    values: Array.isArray(values)
      ? values.reduce((record, item, index) => {
          record['' + index] = item;
          return record;
        }, {})
      : values,
  });
}

type Value = string | boolean | number | null;

interface Props {
  values: Record<string, Value>;
}

class Enum implements SchemaFragment {
  values: Record<string, Value>;

  [schemaFragmentFrag]: true = true as const;

  constructor(props: Props) {
    const { values } = props;

    Object.values(values).forEach((value) => {
      if (typeof value !== 'string' && typeof value !== 'boolean' && typeof value !== 'number' && value !== null) {
        throw Error(`Enum values must be a string, boolean, number, or null. Got "${inspect(value)}".`);
      }
    });

    this.values = values;
  }

  buildASTNode() {
    return {
      kind: 'enum' as const,
      values: this.values,
    };
  }
}

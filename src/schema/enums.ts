import { schemaFragmentFrag } from './symbols';
import { SchemaFragment } from './types';
import { inspect } from 'util';

export function enums(props: { name?: string; values: Record<string, Value> | Record<number, Value> }): SchemaFragment {
  const { values, name } = props;

  return new Enum({
    name,
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
  name?: string;
}

class Enum implements SchemaFragment {
  values: Record<string, Value>;
  name?: string;

  [schemaFragmentFrag]: true = true as const;

  constructor(props: Props) {
    const { values } = props;
    this.name = props.name;

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
      name: this.name,
    };
  }
}

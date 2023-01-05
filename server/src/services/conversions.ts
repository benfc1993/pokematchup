import { matchups, Types } from './perms';

export const typeToName = (type: Types): string => matchups[type].name;

export const typesSetToNames = (types: Set<Types>): string[] =>
  Array.from(types).map((t) => typeToName(t));

export const typesToNames = (types: Types[]): string[] =>
  types.map((t) => typeToName(t));

export const namesToTypes = (types: string[]) => {
  const entries = Object.entries(matchups);
  return types
    .map((t) => {
      for (const [key, value] of entries) {
        if (value.name.toLowerCase() === t.toLowerCase())
          return parseInt(key) as Types;
      }
    })
    .filter((type) => type !== undefined) as Types[];
};

export const nameToType = (name: string): Types => {
  const entries = Object.entries(matchups);

  let type: Types = Types.N;

  for (const [key, value] of entries) {
    if (value.name.toLowerCase() === name.toLowerCase())
      type = parseInt(key) as Types;
  }

  return type;
};

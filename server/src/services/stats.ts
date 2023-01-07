import { typesSetToNames, typesToNames } from './conversions';
import { matchups, Types } from './perms';

export type PokemonStats = {
  defence: string[];
  weakness: string[];
  offence: string[];
  resistances: string[];
  types: string[];
};

export const getStats = (types: Types[]): PokemonStats => {
  const weaknesses = getWeaknesses(types);
  const defences = getDefences(types);
  const offences = getOffences(types);
  const resistances = getResistances(types);

  for (const d of defences) {
    if (weaknesses.has(d)) {
      weaknesses.delete(d);
      if (!resistances.has(d)) {
        defences.delete(d);
      }
    }
  }

  for (const defence of defences) {
    if (weaknesses.has(defence)) {
      weaknesses.delete(defence);
      defences.delete(defence);
      continue;
    }
  }

  for (const resistance of resistances) {
    weaknesses.delete(resistance);
    defences.delete(resistance);
  }

  return {
    weakness: typesSetToNames(weaknesses),
    defence: typesSetToNames(defences),
    offence: typesSetToNames(offences),
    resistances: typesSetToNames(resistances),
    types: typesToNames(types)
  };
};

export const getWeaknesses = (types: Types[]) =>
  new Set(types.flatMap((t) => matchups[t].weakness));

export const getDefences = (types: Types[]) =>
  new Set(types.flatMap((t) => matchups[t].defence));

export const getOffences = (types: Types[]) =>
  new Set(types.flatMap((t) => matchups[t].offence));

export const getResistances = (types: Types[]) =>
  new Set(types.flatMap((t) => matchups[t].resistances));

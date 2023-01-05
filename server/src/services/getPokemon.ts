import { writeFile } from 'fs/promises';
import { cache } from '../server/server';
import { apiCall, Pokemon } from './api';
import { namesToTypes, typesToNames } from './conversions';
import { Types } from './perms';
import { getStats, PokemonStats } from './stats';
import { TeamData, TeamMember } from './teamValidations';

type MatchupResult = {
  opponentData: PokemonStats;
  teamChoices: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
    }
  >;
};

export const matchupByName = async (
  teamData: TeamData,
  name: string
): Promise<MatchupResult> => {
  return getPokemonTypes(name).then(
    async (opponentTypes) => await matchupByTypes(teamData, opponentTypes)
  );
};

export const matchupByTypes = async (
  teamData: TeamData,
  opponentTypes: Types[]
): Promise<MatchupResult> => {
  const teamChoices = await monsterChoice(teamData, opponentTypes);
  const results = formatResults(teamChoices, opponentTypes);
  return results;
};

export const getPokemonTypes = async (name: string) => {
  const cacheIndex = cache.index.indexOf(name.toLowerCase());
  if (cacheIndex !== -1) {
    return cache.data[cacheIndex];
  } else {
    return await apiCall(name).then(async (data) => {
      const opponent = (data.data as Pokemon).types.map((t) => t.type.name);
      cache.index.push(name.toLowerCase());
      cache.data.push(namesToTypes(opponent));
      writeFile('data/cache.json', JSON.stringify(cache));

      return namesToTypes(opponent);
    });
  }
};

export const monsterChoice = async (
  teamData: TeamData,
  opponentTypes: Types[]
) => {
  const choices: Record<
    string,
    { offence: string[]; damageMultiplier: number; resistances: string[] }
  > = {};

  const teamMembers: [string, TeamMember][] = Object.entries(teamData.team) as [
    string,
    TeamMember
  ][];

  teamMembers.forEach(
    ([teamMemberTypeString, teamMember]: [string, TeamMember]) => {
      const teamMemberTypes = teamMemberTypeString.split(' - ');

      const opponentStats = getStats(opponentTypes);

      const opponentIsResistant = teamMemberTypes
        .map((type) => opponentStats.resistances.includes(type))
        .reduce((bool, res) => bool && res, false);

      const damageMultiplier = calculateDefence(
        teamMember,
        typesToNames(opponentTypes)
      );

      const offence: string[] = calculateOffenceTypes(
        teamMemberTypes,
        opponentStats
      );

      const resistances =
        teamMember.resistances.filter((resistance) =>
          typesToNames(opponentTypes).includes(resistance)
        ) || [];

      if (damageMultiplier <= 1 && !opponentIsResistant)
        choices[teamMemberTypeString] = {
          offence,
          damageMultiplier,
          resistances
        };
    }
  );

  return choices;
};

const calculateDefence = (
  teamMember: TeamMember | undefined,
  opponentTypes: string[]
): number => {
  if (!teamMember) return 1;
  let damageMultiplier: number = 1;

  for (const type of opponentTypes) {
    if (teamMember?.defence.includes(type)) damageMultiplier *= 0.5;

    if (teamMember?.weakness.includes(type)) {
      damageMultiplier *= 2;
    }

    if (teamMember?.resistances.includes(type)) {
      damageMultiplier *= 0;
    }
  }

  return damageMultiplier;
};

const calculateOffenceTypes = (
  teamMemberTypes: string[],
  opponentStats: PokemonStats
): string[] => {
  const offence: string[] = [];

  for (const type of teamMemberTypes) {
    if (opponentStats.weakness.includes(type)) offence.push(type);
  }

  return offence;
};

export function formatResults(
  results: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
    }
  >,
  opponentTypes: Types[]
): {
  opponentData: PokemonStats;
  teamChoices: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
    }
  >;
} {
  return {
    opponentData: getStats(opponentTypes),
    teamChoices: results
  };
}

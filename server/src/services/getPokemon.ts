import { writeFile } from 'fs/promises';
import { cache } from '../server/server';
import { apiCall, Pokemon } from './api';
import { namesToTypes, typesToNames } from './conversions';
import { Types } from './perms';
import { getStats, PokemonStats } from './stats';
import { TeamData, TeamMember } from './teamValidations';

type MatchupResult = {
  opponentData: TeamMember;
  teamChoices: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
      score: number;
    }
  >;
};

export const matchupByName = async (
  teamData: TeamData,
  name: string
): Promise<MatchupResult> => {
  try {
    const opponentTypes = await getPokemonTypes(name);
    const results = await matchupByTypes(teamData, opponentTypes, name);
    return results;
  } catch (err) {
    throw err;
  }
};

export const matchupByTypes = async (
  teamData: TeamData,
  opponentTypes: Types[],
  opponenName: string = ''
): Promise<MatchupResult> => {
  try {
    const teamChoices = await monsterChoice(teamData, opponentTypes);
    const results = formatResults(opponenName, teamChoices, opponentTypes);
    return results;
  } catch (err) {
    throw err;
  }
};

export const getPokemonTypes = async (name: string) => {
  const cacheIndex = cache.index.indexOf(name.toLowerCase());
  if (cacheIndex !== -1) {
    return cache.data[cacheIndex];
  } else {
    return await apiCall(name)
      .then(async (data) => {
        const opponent = (data.data as Pokemon).types.map((t) => t.type.name);
        cache.index.push(name.toLowerCase());
        cache.data.push(namesToTypes(opponent));
        writeFile('data/cache.json', JSON.stringify(cache));

        return namesToTypes(opponent);
      })
      .catch((err) => {
        throw err;
      });
  }
};

export const monsterChoice = async (
  teamData: TeamData,
  opponentTypes: Types[]
) => {
  const choices: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
      score: number;
    }
  > = {};

  const teamMembers: TeamMember[] = teamData.team;

  teamMembers.forEach((teamMember: TeamMember) => {
    const opponentStats = getStats(opponentTypes);

    const opponentIsResistant = teamMember.types
      .map((type) => opponentStats.resistances.includes(type))
      .reduce((bool, res) => bool && res, false);

    const damageMultiplier = calculateDefence(
      teamMember,
      typesToNames(opponentTypes)
    );

    const offence: string[] = calculateOffenceTypes(
      teamMember.types,
      opponentStats
    );

    const resistances =
      teamMember.resistances.filter((resistance) =>
        typesToNames(opponentTypes).includes(resistance)
      ) || [];

    if (damageMultiplier <= 1 && !opponentIsResistant)
      choices[teamMember.monName] = {
        offence,
        damageMultiplier,
        resistances,
        score: calculateScore(damageMultiplier, resistances, offence)
      };
  });

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
  opponentName: string,
  results: Record<
    string,
    {
      offence: string[];
      damageMultiplier: number;
      resistances: string[];
      score: number;
    }
  >,
  opponentTypes: Types[]
): MatchupResult {
  return {
    opponentData: { ...getStats(opponentTypes), monName: opponentName },
    teamChoices: results
  };
}
const calculateScore = (
  damageMultiplier: number,
  resistances: string[],
  offence: string[]
): number => {
  const defenceScore = (1 - damageMultiplier) / 0.25;
  const resistancesScore = resistances.length;
  const offenceScore = offence.length;

  return defenceScore * 0.5 + resistancesScore * 2 + offenceScore * 4;
};

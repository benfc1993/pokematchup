import { Types, matchups } from './perms';
import { nameToType, typesSetToNames } from './conversions';
import { getStats, PokemonStats } from './stats';
import { CreateUUID } from './createUUID';

type Team = Types[][];

export type TeamData = {
  types: Team;
  team: TeamMember[];
  defences: string[];
  offences: string[];
  weaknesses: string[];
};

export type TeamMember = PokemonStats & {
  monName: string;
  id: string;
};

export const validateTeam = (team: Team, names: string[]) => {
  const teamData: TeamData = {
    types: team,
    team: [],
    defences: [],
    offences: [],
    weaknesses: []
  };

  const fullDefence = new Set<Types>();
  const fullOffence = new Set<Types>();
  const fullWeaknesses = new Set<Types>();

  let i = 0;
  for (const mon of team) {
    const monStats = getStats(mon);

    teamData.team.push({ ...monStats, monName: names[i], id: CreateUUID() });

    for (const o of monStats.offence) {
      fullOffence.add(nameToType(o));
    }

    for (const d of monStats.defence) {
      fullDefence.add(nameToType(d));
    }

    for (const r of monStats.resistances) {
      fullDefence.add(nameToType(r));
    }

    for (const w of monStats.weakness) {
      fullWeaknesses.add(nameToType(w));
    }

    i++;
  }

  for (const d of fullDefence) {
    fullWeaknesses.delete(d);
  }

  teamData.defences = typesSetToNames(fullDefence);
  teamData.offences = typesSetToNames(fullOffence);
  teamData.weaknesses = typesSetToNames(fullWeaknesses);

  return teamData;
};

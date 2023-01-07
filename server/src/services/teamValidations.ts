import { Types, matchups } from './perms';
import { nameToType, typesSetToNames } from './conversions';
import { getStats, PokemonStats } from './stats';

type Team = Types[][];

export type TeamData = {
  types: Team;
  team: Record<string, TeamMember>;
  defences: string[];
  offences: string[];
};

export type TeamMember = PokemonStats & {
  monName?: string;
};

export const validateTeam = (team: Team, names?: (string | null)[]) => {
  const teamData: TeamData = {
    types: team,
    team: {},
    defences: [],
    offences: []
  };

  const fullDefence = new Set<Types>();
  const fullOffence = new Set<Types>();

  let i = 0;
  for (const mon of team) {
    const monType = mon.map((t) => matchups[t].name).join(' - ');

    const monStats = getStats(mon);

    teamData.team[monType] = monStats;

    for (const o of monStats.offence) {
      fullOffence.add(nameToType(o));
    }

    for (const d of monStats.defence) {
      fullDefence.add(nameToType(d));
    }

    for (const r of monStats.resistances) {
      fullDefence.add(nameToType(r));
    }

    if (names && names[i] !== null) {
      (teamData.team[monType] as TeamMember).monName = names[i] as string;
    }
    i++;
  }

  teamData.defences = typesSetToNames(fullDefence);
  teamData.offences = typesSetToNames(fullOffence);

  return teamData;
};

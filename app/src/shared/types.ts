export const types: string[] = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy'
];

export type typeNames =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Dark'
  | 'Steel'
  | 'Fairy';

export enum Types {
  N,
  F,
  W,
  Gra,
  E,
  I,
  Fi,
  Po,
  Gro,
  Fl,
  Ps,
  B,
  R,
  Gh,
  Dr,
  Da,
  S,
  Fai
}

export type PokemonStats = {
  defence: string[];
  weakness: string[];
  offence: string[];
  resistances: string[];
  types: string[];
};

type Team = Types[][];

export type TeamData = {
  types: Team;
  team: Partial<Record<string, TeamMember>>;
  defences: string[];
  offences: string[];
  weaknesses: string[];
};

export type TeamMember = PokemonStats & {
  monName: string;
};

export type MatchupTeamChoices = Record<
  string,
  {
    offence: string[];
    damageMultiplier: number;
    resistances: string[];
  }
>;

export type MatchupResult = {
  opponentData: TeamMember;
  teamChoices: MatchupTeamChoices;
};

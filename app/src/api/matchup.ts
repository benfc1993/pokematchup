import { MatchupResult, TeamData } from '../shared/types';

export const matchupByName = async (
  teamData: TeamData,
  name: string
): Promise<MatchupResult> => {
  const response = await fetch(`/matchup/name`, {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      name: name.normalize('NFD').replace(/\p{Diacritic}/gu, '')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

export const matchupByTypes = async (
  teamData: TeamData,
  types: string[]
): Promise<MatchupResult> => {
  const response = await fetch(`/matchup/type`, {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      types
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

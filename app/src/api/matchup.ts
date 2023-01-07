import { MatchupResult, TeamData } from '../shared/types';
import { baseUrl } from './api';

export const matchupByName = async (
  teamData: TeamData,
  name: string
): Promise<MatchupResult> => {
  const response = await fetch(`${baseUrl}/matchup/name`, {
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

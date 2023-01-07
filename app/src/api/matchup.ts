import { MatchupResult, TeamData } from '../shared/types';

export const matchupByName = async (
  teamData: TeamData,
  name: string
): Promise<MatchupResult> => {
  const response = await fetch('/matchup/name', {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

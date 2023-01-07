import { TeamData } from '../shared/types';
import { baseUrl } from './api';

export const removeMemberById = async (
  teamData: TeamData,
  memberIndex: number
) => {
  const response = await fetch(`/team/remove`, {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      memberIndex
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

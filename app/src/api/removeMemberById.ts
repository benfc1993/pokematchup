import { TeamData } from '../shared/types';

export const removeMemberById = async (
  teamData: TeamData,
  memberId: string
) => {
  const response = await fetch(`/team/remove`, {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      memberId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

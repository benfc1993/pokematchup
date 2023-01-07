import { TeamData } from '../shared/types';
import { baseUrl } from './api';

export const addMemberByType = async (
  teamData: TeamData,
  types: number[],
  name: string
) => {
  const response = await fetch(`/team/add/types`, {
    method: 'POST',
    body: JSON.stringify({
      teamData,
      types: types.filter((t) => t >= 0),
      name: name.normalize('NFD').replace(/\p{Diacritic}/gu, '')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) throw response;
  return await response.json();
};

export const addMemberByName = async (teamData: TeamData, name: string) => {
  const response = await fetch(`/team/add/name`, {
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

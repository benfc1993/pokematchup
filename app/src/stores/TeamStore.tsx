import React, { useEffect, useState } from 'react';
import { addMemberByName, addMemberByType } from '../api/addMember';
import { removeMemberById } from '../api/removeMemberById';
import { TeamData } from '../shared/types';

export const useTeamStore = () => {
  const [teamData, setTeamData] = useState<TeamData>({
    types: [],
    team: {},
    defences: [],
    offences: [],
    weaknesses: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedTeam = localStorage.getItem('team');
    if (storedTeam && storedTeam !== 'undefined') {
      setData(JSON.parse(storedTeam));
      setLoading(false);
    }
  }, []);

  const setData = (newTeamData: TeamData) => {
    localStorage.setItem('team', JSON.stringify(newTeamData));

    setTeamData(newTeamData);
  };

  const addByType = async (types: string[], name: string) => {
    const newTeam = await addMemberByType(teamData, types, name);
    setData(newTeam);
  };

  const addByName = async (name: string) => {
    const newTeam = await addMemberByName(teamData, name);
    setData(newTeam);
  };

  const removeMember = async (memberId: number) => {
    const newTeam = await removeMemberById(teamData, memberId);
    setData(newTeam);
  };

  return {
    teamData,
    setData: (newTeamData: TeamData) => setData(newTeamData),
    addByType: async (types: string[], name: string) => addByType(types, name),
    addByName: async (name: string) => addByName(name),
    removeMember: (memberId: number) => removeMember(memberId),
    loading
  };
};
type UseTeamStoreType = ReturnType<typeof useTeamStore>;

export const TeamStoreContext = React.createContext<UseTeamStoreType | null>(
  null
);
export const useTeamStoreContext = () => React.useContext(TeamStoreContext)!;

export const TeamStoreProvider = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <TeamStoreContext.Provider value={useTeamStore()}>
    {children}
  </TeamStoreContext.Provider>
);

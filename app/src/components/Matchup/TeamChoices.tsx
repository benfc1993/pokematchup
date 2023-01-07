import { useEffect } from 'react';
import { matchupByName } from '../../api/matchup';
import { TeamMember } from '../../shared/types';
import { useMatchupStore } from '../../stores/matchupStore';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { EmptyCard } from '../TeamView/MemberCard/EmptyCard';
import { MemberCard } from '../TeamView/MemberCard/MemberCard';

export const TeamChoices = () => {
  const [teamChoices, setStore] = useMatchupStore((store) => store.teamChoices);
  const { teamData, removeMember } = useTeamStoreContext();
  const teamMembers = Object.values(teamData.team) ?? [];

  return (
    <div className="team-grid">
      {teamData &&
        Array.from({ length: 6 }).map((_v, idx) => {
          return teamMembers[idx] ? (
            <MemberCard
              selected={
                teamChoices !== null &&
                (teamMembers[idx]?.monName as string) in teamChoices
              }
              key={teamMembers[idx]?.monName}
              onRemoveClicked={() => removeMember(idx)}
              member={teamMembers[idx] as TeamMember}
            />
          ) : (
            <EmptyCard key={idx} />
          );
        })}
    </div>
  );
};

import { TeamMember } from '../../shared/types';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { EmptyCard } from './MemberCard/EmptyCard';
import { MemberCard } from './MemberCard/MemberCard';
import './teamView.scss';

export const TeamView: React.FC = () => {
  const { teamData, removeMember } = useTeamStoreContext();
  const teamMembers = Object.values(teamData.team) ?? [];
  const teamMembersIds = Object.keys(teamData.team) ?? [];

  return (
    <div className="team-grid">
      {teamData &&
        Array.from({ length: 6 }).map((_v, idx) => {
          return teamMembers[idx] ? (
            <MemberCard
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
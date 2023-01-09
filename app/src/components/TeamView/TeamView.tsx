import { TeamMember } from '../../shared/types';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { EmptyCard } from './MemberCard/EmptyCard';
import { MemberCard } from './MemberCard/MemberCard';
import './teamView.scss';

export const TeamView: React.FC = () => {
  const { teamData, removeMember } = useTeamStoreContext();
  const teamMembers = Object.values(teamData.team) ?? [];

  return (
    <div className="team-grid">
      {teamData &&
        Array.from({ length: 6 }).map((_v, idx) => {
          return teamMembers[idx] ? (
            <div className="grid-item">
              <MemberCard
                key={teamMembers[idx]?.monName}
                onRemoveClicked={() =>
                  removeMember(teamMembers[idx]?.id as string)
                }
                member={teamMembers[idx] as TeamMember}
              />
            </div>
          ) : (
            <div className="grid-item">
              <EmptyCard key={idx} />
            </div>
          );
        })}
    </div>
  );
};

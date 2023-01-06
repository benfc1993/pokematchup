import { useEffect } from 'react';
import { useTeamStoreContext } from '../stores/TeamStore';

export const TeamView: React.FC = () => {
  const { teamData } = useTeamStoreContext();

  return (
    <div>
      {teamData &&
        Object.entries(teamData.team).map(([types, member], idx) => (
          <p key={`${member?.monName}-${idx}`}>
            {member?.monName}-{types}
          </p>
        ))}
    </div>
  );
};

import { useTeamStore, useTeamStoreContext } from '../../stores/TeamStore';
import { TypesList } from '../TypesList/TypesList';

export const TeamSummary: React.FC = () => {
  const { teamData } = useTeamStoreContext();
  return (
    teamData && (
      <>
        <div className="flex-column align-center">
          <h3>Defences:</h3>
          <TypesList list={teamData.defences} />
        </div>
        <div className="flex-column align-center">
          <h3>Offences:</h3>
          <TypesList list={teamData.offences} />
        </div>
        <div className="flex-column align-center">
          <h3>Weaknesses:</h3>
          <TypesList list={teamData.weaknesses} />
        </div>
      </>
    )
  );
};

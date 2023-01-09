import { useTeamStoreContext } from '../../stores/TeamStore';
import { TypesList } from '../TypesList/TypesList';
import styles from './TeamSummary.module.scss';

export const TeamSummary: React.FC = () => {
  const { teamData } = useTeamStoreContext();
  return (
    teamData && (
      <div className={styles['team-summary']}>
        <div className="flex-column align-center w-100">
          <h3>Defences:</h3>
          <TypesList list={teamData.defences} size={'small'} />
        </div>
        <div className="flex-column align-center  w-100">
          <h3>Offences:</h3>
          <TypesList list={teamData.offences} size={'small'} />
        </div>
        <div className="flex-column align-center  w-100">
          <h3>Weaknesses:</h3>
          <TypesList list={teamData.weaknesses} size={'small'} />
        </div>
      </div>
    )
  );
};

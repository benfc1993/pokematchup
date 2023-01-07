import { MatchupProvider } from '../../stores/matchupStore';
import { OpponentSelection } from '../../components/Matchup/OpponentSelection';
import { OpponentStats } from '../../components/Matchup/OpponentStats';
import { TeamChoices } from '../../components/Matchup/TeamChoices/TeamChoices';
import style from './Matchup.module.scss';

export const Matchup: React.FC = () => {
  return (
    <MatchupProvider>
      <div className="flex-column w-100">
        <h1>Matchup</h1>
        <div className={style['matchup-page']}>
          <div className={style.section}>
            <TeamChoices />
          </div>
          <div></div>
          <div className={style.section}>
            <div className="flex-column">
              <OpponentSelection />
            </div>
            <OpponentStats />
          </div>
        </div>
      </div>
    </MatchupProvider>
  );
};

import { MatchupProvider } from '../../stores/matchupStore';
import { OpponentSelection } from '../../components/Matchup/OpponentSelection';
import { OpponentStats } from '../../components/Matchup/OpponentStats';
import { TeamChoices } from '../../components/Matchup/TeamChoices/TeamChoices';
import style from '../Page.module.scss';
import './Matchup.scss';

export const Matchup: React.FC = () => {
  return (
    <MatchupProvider>
      <div className="flex-column w-100">
        <div className={`${style['page']} team-choices`}>
          <div className={style.section}>
            <TeamChoices />
          </div>
          <div></div>
          <div className={`${style.section} opponent`}>
            <OpponentStats />
            <OpponentSelection />
          </div>
        </div>
      </div>
    </MatchupProvider>
  );
};

import { MatchupProvider } from '../../stores/matchupStore';
import { OpponentSelection } from '../../components/Matchup/OpponentSelection';
import { OpponentStats } from '../../components/Matchup/OpponentStats';
import { TeamChoices } from '../../components/Matchup/TeamChoices/TeamChoices';
import { Page } from '../Page';
import { CardFlip } from '../../components/CardFlip/CardFlip';
import { useSubscriber } from '../../hooks/useSubscriber';
import style from '../Page.module.scss';
import './Matchup.scss';

export const Matchup: React.FC = () => {
  const { subscribe, raise } = useSubscriber();

  return (
    <Page>
      <MatchupProvider>
        <div className={`${style['page']}`}>
          <div className={`${style.section}  team-choices`}>
            <TeamChoices />
          </div>
          <div className={`${style.section} opponent mobile`}>
            <CardFlip subscribe={subscribe}>
              <OpponentSelection onSelectionChanged={raise} />
              <div>
                <OpponentStats />
                <button className="button" onClick={() => raise()}>
                  Change
                </button>
              </div>
            </CardFlip>
          </div>
          <div className={`${style.section} opponent desktop`}>
            <OpponentSelection />
            <OpponentStats />
          </div>
        </div>
      </MatchupProvider>
    </Page>
  );
};

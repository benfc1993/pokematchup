import { TeamSummary } from '../components/TeamSummary/TeamSummary';
import { TeamView } from '../components/TeamView/TeamView';
import style from './Page.module.scss';

export const TeamBalancer: React.FC = () => {
  return (
    <div className="flex-column w-100">
      <h1 className={style['page__title']}>Team Balancer</h1>

      <div className={style.page}>
        <div className={style.section}>
          <TeamView />
        </div>
        <div></div>
        <div className={`${style.section} justify-center`}>
          <TeamSummary />
        </div>
      </div>
    </div>
  );
};

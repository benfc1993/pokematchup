import { TeamSummary } from '../components/TeamSummary/TeamSummary';
import { TeamView } from '../components/TeamView/TeamView';

export const TeamBalancer: React.FC = () => {
  return (
    <div className="flex-column w-100">
      <h1>Team Balancer</h1>

      <div className="d-flex align-center justify-center w-100">
        <div style={{ width: '50%', padding: '1em' }}>
          <TeamView />
        </div>
        <div style={{ width: '50%', padding: '1em' }}>
          <TeamSummary />
        </div>
      </div>
    </div>
  );
};

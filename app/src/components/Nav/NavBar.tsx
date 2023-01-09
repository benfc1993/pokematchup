import { Link, useNavigation } from 'react-router-dom';
import './NavBar.scss';

const titles: Record<string, string> = {
  '/team-balancer': 'Team Balancer',
  '/team-matchup': 'Matchup'
};

export const NavBar = () => {
  useNavigation();
  const balancer = window.location.pathname === '/team-balancer';

  return (
    <>
      <div className="nav">
        <h1 className="nav__title">
          {titles[window.location.pathname as string]}
        </h1>
        <Link
          to={'/team-balancer'}
          className={`${balancer ? 'active' : ''} nav__item`}
        >
          Team
        </Link>
        <Link
          to={'/team-matchup'}
          className={`${balancer ? '' : 'active'} nav__item`}
        >
          Matchup
        </Link>
      </div>
      {/* <ScrollToPoint /> */}
    </>
  );
};

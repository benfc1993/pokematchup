import { createBrowserRouter, Outlet } from 'react-router-dom';
import { TeamStoreProvider } from './stores/TeamStore';
import { TeamBalancer } from './pages/TeamBalancer/TeamBalancer';
import { Matchup } from './pages/Matchup/Matchup';
import { NavBar } from './components/Nav/NavBar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <TeamStoreProvider>
          <NavBar />
          <Outlet />
        </TeamStoreProvider>
      </>
    ),
    children: [
      {
        path: '/team-balancer',
        element: <TeamBalancer />
      },
      {
        path: '/team-matchup',
        element: <Matchup />
      }
    ]
  }
]);

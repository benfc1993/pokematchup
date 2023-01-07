import { createBrowserRouter, Outlet } from 'react-router-dom';
import { TeamStoreProvider } from './stores/TeamStore';
import { TeamBalancer } from './pages/TeamBalancer';
import { Matchup } from './pages/Matchup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <TeamStoreProvider>
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

import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AddMember } from './pages/AddMember';
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
        path: '/team',
        element: <TeamBalancer />
      },
      {
        path: '/team/add',
        element: <AddMember />
      },
      {
        path: '/matchup',
        element: <Matchup />
      }
    ]
  }
]);

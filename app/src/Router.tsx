import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AddMember } from './pages/AddMember';
import { TeamView } from './components/TeamView/TeamView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/team',
        element: <TeamView />
      },
      {
        path: '/team/add',
        element: <AddMember />
      }
    ]
  }
]);

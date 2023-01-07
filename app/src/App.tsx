import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { router } from './Router';
import { TeamStoreProvider } from './stores/TeamStore';
import { TeamView } from './components/TeamView/TeamView';

function App() {
  return (
    <TeamStoreProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </TeamStoreProvider>
  );
}

export default App;

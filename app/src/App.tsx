import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { router } from './Router';
import { TeamStoreProvider } from './stores/TeamStore';
import { TeamView } from './components/TeamView/TeamView';
import { useFuse } from './fuse/useFuse';
import { Autocomplete } from './components/Forms/Inputs/Autocomplete';
import Fuse from 'fuse.js';
import { useState } from 'react';

function App() {
  const [selection, setSelection] = useState<string>('');
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

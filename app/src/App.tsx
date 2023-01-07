import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { router } from './Router';

function App() {
  console.log(process.env.ENV);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './App.scss';
import { useEffect, useRef } from 'react';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

export const ScrollToPoint = () => {
  const scrollTo = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollTo.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return <div ref={scrollTo}></div>;
};

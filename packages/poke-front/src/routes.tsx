import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/mainPage/mainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'who-is-that-pokemon',
    element: <div>TEGA</div>,
  },
  { path: 'poke-party' },
]);

export default router;

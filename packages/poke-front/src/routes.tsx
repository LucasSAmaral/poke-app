import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/mainPage/mainPage';
import WhoIsThatPokemon from './pages/whoIsThatPokemon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'who-is-that-pokemon',
    element: <WhoIsThatPokemon />,
  },
  { path: 'poke-party' },
]);

export default router;

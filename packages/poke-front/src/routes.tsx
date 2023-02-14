import { createBrowserRouter } from 'react-router-dom';
import GameOver from './pages/gameOver';
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
  {
    path: 'game-over',
    element: <GameOver />,
  },
  { path: 'poke-party' },
]);

export default router;

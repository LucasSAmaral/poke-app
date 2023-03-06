import { createBrowserRouter } from 'react-router-dom';
import ComingSoon from './components/commons/comingSoon';
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
  { path: 'poke-party', element: <ComingSoon /> },
  { path: 'pokedex', element: <ComingSoon /> },
]);

export default router;

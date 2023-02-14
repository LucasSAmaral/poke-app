import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import { Link } from 'react-router-dom';

const GameOver: React.FC = () => {
  return (
    <GameOverWrapper>
      <GameOverTitle>Game Over</GameOverTitle>
      <TryAgainButton to="/who-is-that-pokemon">Try Again</TryAgainButton>
    </GameOverWrapper>
  );
};

const GameOverWrapper = styled(PageWrapper)`
  justify-content: start;
  gap: 50px;
`;

const GameOverTitle = styled(PageTitle)`
  margin-bottom: 0;
`;

const TryAgainButton = styled(Link)`
  font-size: 1rem;
  padding: 10px 5px;
  width: 100%;
  max-width: 100px;
  text-align: center;
  background-color: #010124;
  color: #ffcb05;
  text-decoration: none;
  background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
  border-radius: 15px;

  &:hover {
    background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
  }

  &:visited {
    color: #ffcb05;
  }
`;

export default GameOver;

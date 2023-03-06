import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import { Link } from 'react-router-dom';
import LinkButton from '../../components/commons/linkButton';

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

const TryAgainButton = styled(LinkButton)`
  max-width: 100px;
`;

export default GameOver;

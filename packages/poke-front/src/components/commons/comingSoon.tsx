import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import LinkButton from './linkButton';

const ComingSoon = () => {
  return (
    <ComingSoonWrapper>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      <GoHome to="/">Home</GoHome>
    </ComingSoonWrapper>
  );
};

const ComingSoonWrapper = styled(PageWrapper)`
  justify-content: start;
  gap: 50px;
`;

const ComingSoonTitle = styled(PageTitle)`
  margin-bottom: 0;
`;

const GoHome = styled(LinkButton)`
  max-width: 100px;
`;

export default ComingSoon;

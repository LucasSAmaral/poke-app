import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';

const LoadingComponent: React.FC = () => {
  return (
    <LoadingComponentWrapper>
      <LoadingComponentTitle>loading...</LoadingComponentTitle>
    </LoadingComponentWrapper>
  );
};

const LoadingComponentWrapper = styled(PageWrapper)``;

const LoadingComponentTitle = styled(PageTitle)``;

export default LoadingComponent;

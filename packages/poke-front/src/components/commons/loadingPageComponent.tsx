import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import PikachuGif from '../../assets/images/pikachu-running.gif';

const LoadingPageComponent: React.FC = () => {
  return (
    <LoadingPageComponentWrapper>
      <LoadingPageComponentImage src={PikachuGif} />
      <LoadingPageComponentTitle>loading...</LoadingPageComponentTitle>
    </LoadingPageComponentWrapper>
  );
};

const LoadingPageComponentWrapper = styled(PageWrapper)``;

const LoadingPageComponentTitle = styled(PageTitle)``;

const LoadingPageComponentImage = styled.img``;

export default LoadingPageComponent;

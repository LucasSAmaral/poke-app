import styled from 'styled-components';
import { PageTitle, PageWrapper } from '../../style/commons.style';

const ErrorComponent: React.FC = () => {
  return (
    <ErrorComponentWrapper>
      <ErrorComponentTitle>Erro ao carregar página</ErrorComponentTitle>
    </ErrorComponentWrapper>
  );
};

const ErrorComponentWrapper = styled(PageWrapper)``;

const ErrorComponentTitle = styled(PageTitle)``;

export default ErrorComponent;

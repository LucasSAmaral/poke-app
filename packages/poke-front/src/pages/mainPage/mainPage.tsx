import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import ErrorComponent from '../../components/commons/errorComponent';
import LoadingPageComponent from '../../components/commons/loadingPageComponent';
import LinkButton from '../../components/commons/linkButton';

const MainPage: React.FC = () => {
  const { queryResponse, pageStatus } = useBffPage<MainPageResponse>(
    'MAIN_PAGE',
    {}
  );

  switch (pageStatus) {
    case 'error':
      return <ErrorComponent />;
    case 'loading':
    case 'idle':
      return <LoadingPageComponent />;
    case 'success': {
      if (!queryResponse) return null;

      const { pageTitle, menuOptions } = queryResponse;

      return (
        <MainPageWrapper>
          <MainPageTitle>{pageTitle}</MainPageTitle>
          <MainPageMenu>
            {menuOptions.map((menuOption, index) => (
              <MainPageMenuLink key={index} to={menuOption.linkPath}>
                {menuOption.menuOptionName}
              </MainPageMenuLink>
            ))}
          </MainPageMenu>
        </MainPageWrapper>
      );
    }
  }
};

const MainPageWrapper = styled(PageWrapper)``;

const MainPageTitle = styled(PageTitle)``;

const MainPageMenu = styled.div`
  width: 100%;
  height: 150px;
  max-width: 300px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainPageMenuLink = styled(LinkButton)`
  font-size: 1.5rem;
`;

export default MainPage;

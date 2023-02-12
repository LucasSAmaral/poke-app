import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import ErrorComponent from '../../components/commons/errorComponent';
import LoadingPageComponent from '../../components/commons/loadingPageComponent';

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
              <Link key={index} to={menuOption.linkPath}>
                {menuOption.menuOptionName}
              </Link>
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

  a {
    font-size: 1.5rem;
    padding: 10px 5px;
    width: 100%;
    text-align: center;
    background-color: #010124;
    color: #ffcb05;
    text-decoration: none;
    background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
    border-radius: 15px;

    &:hover {
      background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
    }
  }
`;

export default MainPage;

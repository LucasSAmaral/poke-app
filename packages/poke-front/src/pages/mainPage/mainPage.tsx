import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useBffPage } from '../../hooks/useBffPage';

const MainPage = () => {
  const { queryResponse, pageStatus } = useBffPage<MainPageResponse>(
    'MAIN_PAGE',
    {}
  );

  switch (pageStatus) {
    case 'loading':
    case 'idle':
      return <MainPageTitle>loading...</MainPageTitle>;
    case 'success': {
      if (!queryResponse) {
        return (
          <MainPageWrapper>
            <MainPageTitle>Erro ao carregar página</MainPageTitle>
          </MainPageWrapper>
        );
      }

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

export const MainPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPageTitle = styled.h2`
  font-size: 50px;
  margin-bottom: 100px;
`;

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

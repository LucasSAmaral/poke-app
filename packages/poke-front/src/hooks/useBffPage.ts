import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export type NodeEnvironment = 'development' | 'production';

const env = process.env.NODE_ENV ?? 'development';

const buildUrlEnv: { [key in NodeEnvironment]: string } = {
  development: 'http://localhost:3333/api/build',
  production: 'https://poke-bff.vercel.app/api/build',
};

export const useBffPage = <PageResponse>(
  pageName: PageName,
  payload: BuildPagePayload,
  options?: Omit<UseQueryOptions<any, any, any, any>, 'queryKey' | 'queryFn'>
) => {
  const {
    data: queryResponse,
    status: pageStatus,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PageResponse, BuildPagePayload>>(
    [pageName],
    async () =>
      await axios.post(
        buildUrlEnv[env as NodeEnvironment],
        {
          pageName,
          payload,
        },
        { timeout: 2000 }
      ),
    { refetchOnWindowFocus: false, ...options }
  );

  return {
    error,
    isLoading,
    pageStatus,
    queryResponse: queryResponse?.data,
  };
};

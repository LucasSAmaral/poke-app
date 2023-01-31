import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

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
        'http://localhost:3333/api/build',
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

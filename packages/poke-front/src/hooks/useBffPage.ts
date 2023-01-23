import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export const useBffPage = <PageResponse>(
  pageName: PageName,
  payload: BuildPagePayload
) => {
  const {
    data: queryResponse,
    status: pageStatus,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PageResponse, BuildPagePayload>>(
    [pageName],
    async () =>
      await axios.post('http://localhost:3333/api/build', {
        pageName,
        payload,
      }),
    { refetchOnWindowFocus: false }
  );

  return {
    error,
    isLoading,
    pageStatus,
    queryResponse: queryResponse?.data,
  };
};

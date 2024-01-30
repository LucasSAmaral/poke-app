import axios, { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { NodeEnvironment } from './useBffPage';

const env = process.env.NODE_ENV ?? 'development';

const actionUrlEnv: { [key in NodeEnvironment]: string } = {
  production: 'http://localhost:3333/api/action',
  development: 'https://poke-bff.vercel.app/api/action',
};

export const useBffAction = <ActionResponse>(
  type: ActionType,
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<ActionResponse, ActionPayload>,
      any,
      any,
      any
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  const {
    status: actionStatus,
    mutate,
    data,
    error,
    isLoading,
    reset,
  } = useMutation<
    AxiosResponse<ActionResponse, ActionPayload>,
    any,
    ActionPayload,
    any
  >(
    async (payload: ActionPayload) =>
      await axios.post(
        actionUrlEnv[env as NodeEnvironment],
        {
          type,
          payload,
        },
        { timeout: 2000 }
      ),
    { ...options }
  );

  return {
    mutate,
    reset,
    error,
    isLoading,
    actionStatus,
    actionResponse: data,
  };
};

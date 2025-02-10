import { useMutation } from '@tanstack/react-query';

import { api } from '@/libs/api-client';
import { MutationConfig } from '@/libs/react-query';
import { Session } from '@/types/api';

export const startSession = (): Promise<Session> => {
   return api.post('/sessions/start/');
};

type UseStartSessionOptions = {
   mutationConfig?: MutationConfig<typeof startSession>;
};

export const useStartSession = ({ mutationConfig }: UseStartSessionOptions = {}) => {
   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      mutationFn: startSession,
      onSuccess: (data, ...args) => {
         if (onSuccess) {
            console.log(data);
            onSuccess?.(data, ...args);
         }
      },
      ...restConfig,
   });
};

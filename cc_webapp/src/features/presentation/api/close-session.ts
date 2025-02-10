import { useMutation } from '@tanstack/react-query';

import { api } from '@/libs/api-client';
import { MutationConfig } from '@/libs/react-query';

export const closeSession = (session_id: string): Promise<{ message: string }> => {
   return api.delete(`/sessions/${session_id}/close/`);
};

type UseCloseSessionOptions = {
   mutationConfig?: MutationConfig<typeof closeSession>;
};

export const useCloseSession = ({ mutationConfig }: UseCloseSessionOptions = {}) => {
   const { ...restConfig } = mutationConfig || {};

   return useMutation({
      mutationFn: closeSession,
      ...restConfig,
   });
};

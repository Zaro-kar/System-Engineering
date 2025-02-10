import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/libs/api-client';
import { QueryConfig } from '@/libs/react-query';
import { Session } from '@/types/api';

type GetSessionParams = {
   session_id?: string;
   session_code?: string;
};

export const getSession = ({ session_id, session_code }: GetSessionParams): Promise<Session> => {
   if (session_id) {
      return api.get(`/session?session_id=${session_id}`);
   }
   if (session_code) {
      return api.get(`/session?session_code=${session_code}`);
   }
   throw new Error('Either a session id or code must be provided');
};

export const getSessionQueryOptions = ({ session_id, session_code }: GetSessionParams) => {
   return queryOptions({
      queryKey: ['session', session_id || session_code],
      queryFn: () => getSession({ session_id, session_code }),
   });
};

type UseGetSessionOptions = {
   session_id?: string;
   session_code?: string;
   queryConfig?: QueryConfig<typeof getSession>;
};

export const useGetSession = ({ session_id, session_code, queryConfig }: UseGetSessionOptions) => {
   return useQuery({
      ...getSessionQueryOptions({ session_id, session_code }),
      ...queryConfig,
      enabled: !!(session_id || session_code),
   });
};

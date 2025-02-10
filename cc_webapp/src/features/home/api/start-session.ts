import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/libs/api-client';
import { MutationConfig } from '@/libs/react-query';

export const startSession = (): Promise<{ uuid: string; numeric_id: string }> => {
    return api.post('/sessions/start/');
};

type UseStartSessionOptions = {
    mutationConfig?: MutationConfig<typeof startSession>;
};

export const useStartSession = ({ mutationConfig }: UseStartSessionOptions = {}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: startSession,
        onSuccess: (data, ...args) => {
            
        },
        ...restConfig,
    });
};
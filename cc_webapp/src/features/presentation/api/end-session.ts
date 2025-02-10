import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/libs/api-client';
import { MutationConfig } from '@/libs/react-query';

export const endSession = (uuid: string): Promise<{ message: string }> => {
    return api.delete(`/sessions/end/${uuid}/`);
};

type UseEndSessionOptions = {
    mutationConfig?: MutationConfig<typeof endSession>;
};

export const useEndSession = ({ mutationConfig }: UseEndSessionOptions = {}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: endSession,
        onSuccess: (data, ...args) => {
        },
        ...restConfig,
    });
};
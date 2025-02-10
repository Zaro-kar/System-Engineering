import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/libs/api-client';
import { MutationConfig } from '@/libs/react-query';

export const voteWordsInputSchema = z.object({
   word_1: z.string().max(15, 'Word must contain at most 15 char(s)'),
   word_2: z.string().max(15, 'Word must contain at most 15 char(s)').optional(),
   word_3: z.string().max(15, 'Word must contain at most 15 char(s)').optional(),
});

export const voteWords = ({
   session_id,
   data,
}: {
   session_id: string;
   data: { words: string[] };
}) => {
   return api.post(`/sessions/${session_id}/vote/`, data);
};

type UseVoteWordsOptions = {
   mutationConfig?: MutationConfig<typeof voteWords>;
};

export const useVoteWords = ({ mutationConfig }: UseVoteWordsOptions = {}) => {
   const { ...restConfig } = mutationConfig || {};
   return useMutation({
      ...restConfig,
      mutationFn: voteWords,
   });
};

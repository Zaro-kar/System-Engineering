import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, VBox } from '@/components/ui';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/configs/path';

import { useVoteWords, voteWordsInputSchema } from '../api/vote-words';

export const VotingForm = () => {
   const { session_id } = useParams<{ session_id: string }>();
   const navigate = useNavigate();

   const voteWordsMutation = useVoteWords({
      mutationConfig: {
         onSuccess: () => {
            navigate(`/presentation/${session_id}`);
         },
         onError: () => {
            navigate(paths.app.sessionClosed.getHref());
         },
      },
   });

   return (
      <Box width={'100%'}>
         <Form
            id="vote-form"
            onSubmit={(values) => {
               const words = [values.word_1, values.word_2, values.word_3].filter(
                  Boolean,
               ) as string[];

               if (!session_id) {
                  console.error('No session id found in the URL.');
                  return;
               }

               voteWordsMutation.mutate({
                  data: { words },
                  session_id: session_id,
               });
            }}
            schema={voteWordsInputSchema}
         >
            {({ formState, register }) => (
               <VBox sx={{ width: '100%', alignItems: 'center' }}>
                  <Input
                     label="Enter a word"
                     type="text"
                     registration={register('word_1')}
                     error={formState.errors.word_1}
                  />
                  <Input
                     label="Enter another word"
                     type="text"
                     registration={register('word_2')}
                     error={formState.errors.word_2}
                  />
                  <Input
                     label="Enter another word"
                     type="text"
                     registration={register('word_3')}
                     error={formState.errors.word_3}
                  />
                  <Button size="large" fullWidth variant="contained" type="submit">
                     Submit
                  </Button>
               </VBox>
            )}
         </Form>
      </Box>
   );
};

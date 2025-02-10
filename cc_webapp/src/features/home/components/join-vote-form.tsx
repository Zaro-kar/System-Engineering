import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { getSession } from '@/api/get-session';
import { HBox, VBox } from '@/components/ui';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/configs/path';

type FormInputs = {
   code: string;
};

export const JoinVoteForm = () => {
   const navigate = useNavigate();

   const [error, setError] = useState<string | null>(null);

   const onSubmit = async (data: FormInputs, isVoting: boolean) => {
      setError(null);

      try {
         const sessionData = await getSession({ session_code: data.code });
         if (!sessionData) {
            setError('Session not found. Please check the Sesson Code.');
            return;
         }

         const destination = isVoting
            ? paths.app.voting.getHref(sessionData.session_id)
            : paths.app.presentation.getHref(sessionData.session_id, true);

         navigate(destination);
      } catch {
         setError('Session not found. Please check the Sesson Code.');
      }
   };

   const joinVoteInputSchema = z.object({
      code: z.string().min(1, 'Please enter a session Code'),
   });

   return (
      <Box sx={{ width: '100%' }}>
         <Form
            id="join-vote-form"
            onSubmit={(values: FormInputs) => onSubmit(values, false)}
            schema={joinVoteInputSchema}
         >
            {({ formState, register, handleSubmit }) => (
               <VBox>
                  <Input
                     label="Enter Session Code"
                     type="text"
                     placeholder="e.g., 001, 999"
                     registration={register('code')}
                     error={formState.errors.code}
                  />

                  {error && <Alert severity="error">{error}</Alert>}

                  <HBox sx={{ gap: '16px' }}>
                     <Button
                        onClick={handleSubmit((data) => onSubmit(data, true))}
                        variant="contained"
                        color="primary"
                        fullWidth
                     >
                        Vote
                     </Button>
                     <Button type="submit" variant="outlined" color="primary" fullWidth>
                        Join
                     </Button>
                  </HBox>
               </VBox>
            )}
         </Form>
      </Box>
   );
};

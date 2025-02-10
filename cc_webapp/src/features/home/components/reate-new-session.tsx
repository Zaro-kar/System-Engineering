import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/configs/path';

import { useStartSession } from '../api/start-session';

export const CreateNewSession = () => {
   const navigate = useNavigate();

   const startSessionMutation = useStartSession({
      mutationConfig: {
         onSuccess: (data) => {
            navigate(paths.app.presentation.getHref(data.session_id, true));
         },
         onError: (error) => {
            console.error('Failed to start session:', error);
         },
      },
   });

   const handleCreateSession = async () => {
      await startSessionMutation.mutateAsync(undefined);
   };

   return (
      <Button variant="contained" color="primary" onClick={handleCreateSession}>
         Create New Session
      </Button>
   );
};

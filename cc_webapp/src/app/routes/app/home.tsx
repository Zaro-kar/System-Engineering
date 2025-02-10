import { Typography } from '@mui/material';

import { MainLayout } from '@/components/layout/main-layout';
import { JoinVoteForm } from '@/features/home/components/join-vote-form';
import { CreateNewSession } from '@/features/home/components/reate-new-session';

export const HomeRoute = () => {
   return (
      <MainLayout>
         {/* Heading */}
         <Typography variant="h4" paddingBottom={4} align="center">
            Welcome to CrowdCloud
         </Typography>

         {/*Forms*/}
         <JoinVoteForm />

         <Typography align="center" variant="h6" gutterBottom>
            or
         </Typography>

         <CreateNewSession />
      </MainLayout>
   );
};

import React from 'react';
import { Typography } from '@mui/material';

import { MainLayout } from '@/components/layout/main-layout';
import { VotingForm } from '@/features/voting/components/voting-form';

export const VotingRoute = () => {
   return (
      <MainLayout>
         {/* Heading */}
         <Typography variant={'h3'} align="center">
            CrowdCloud
         </Typography>

         <Typography variant={'h6'} align="center">
            What are you hoping to get out of this session?
         </Typography>

         {/* Voting Form */}
         <VotingForm />
      </MainLayout>
   );
};

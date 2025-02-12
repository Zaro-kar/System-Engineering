import React from 'react';
import { Button, Typography } from '@mui/material';

import { MainLayout } from '@/components/layout/main-layout';
import { VotingForm } from '@/features/voting/components/voting-form';
import { paths } from '@/configs/path';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const VotingRoute = () => {
   const navigate = useNavigate()
   return (
      <MainLayout>
         {/* Heading */}
         <Typography variant={'h3'} align="center">
            CrowdCloud
         </Typography>

         <Button onClick={() => navigate(paths.app.home.getHref())} startIcon={<Home/>}>Home</Button>

         <Typography variant={'h6'} align="center">
            What are you hoping to get out of this session?
         </Typography>

         {/* Voting Form */}
         <VotingForm />
      </MainLayout>
   );
};

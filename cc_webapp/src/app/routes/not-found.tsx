import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/configs/path';

export const NotFoundRoute = () => {
   const navigate = useNavigate();

   return (
      <Box
         sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Typography variant="h1" color={'dark'}>
            404
         </Typography>
         <Typography variant="h4">Sorry, Page Not Found.</Typography>
         <Typography variant="h6" color={'dark'}>
            The page you requested could not be found.
         </Typography>
         <Button
            variant="contained"
            sx={{ color: 'white', marginTop: 3 }}
            onClick={() => navigate(paths.app.home.path)}
         >
            Back to home
         </Button>
      </Box>
   );
};

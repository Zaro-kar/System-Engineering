import React from 'react';
import { Box, Typography } from '@mui/material';
import { Spinner } from './spinner';

export const CenterSpinner = () => (
   <Box
      sx={{
         height: '100vh',
         width: '100vw',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      }}
   >
      <Box display={'flex'} flexDirection={'column'}>
         <Spinner />
         <Typography variant="body1" p={2}>
            Loading...
         </Typography>
      </Box>
   </Box>
);

import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/configs/path';

export const SessionClosedRoute = () => {
   const navigate = useNavigate();

   const handleBackToHome = () => {
      navigate(paths.app.home.getHref());
   };

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            p: 2,
         }}
      >
         <Typography variant="h4" gutterBottom>
            Session Closed
         </Typography>
         <Typography variant="body1" sx={{ mb: 3 }}>
            This session has been closed.
         </Typography>
         <Button variant="contained" color="primary" onClick={handleBackToHome}>
            Back to Home
         </Button>
      </Box>
   );
};

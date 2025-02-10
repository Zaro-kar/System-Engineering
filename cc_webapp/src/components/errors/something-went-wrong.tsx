import { WarningAmberRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

export const SomethingWentWrong = () => {
   return (
      <Box
         sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <WarningAmberRounded sx={{ fontSize: 60, pb: 1 }} color="primary" />
         <Typography variant="h4">Something went wrong</Typography>
         <Typography variant="h6">
            {"There's an issue and the page could not be loaded."}
         </Typography>
         <Button
            onClick={() => {
               window.location.reload();
            }}
         >
            Reload page
         </Button>
      </Box>
   );
};

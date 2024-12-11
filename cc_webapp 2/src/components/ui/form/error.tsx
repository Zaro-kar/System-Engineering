import { Box, Typography } from '@mui/material';

export type ErrorProps = {
   errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
   if (!errorMessage) return null;

   return (
      <Box
         role="alert"
         arial-label={errorMessage}
         sx={{ color: 'error.main', fontWeight: 'fontWeightBold' }}
      >
         <Typography variant="body2">{errorMessage}</Typography>
      </Box>
   );
};

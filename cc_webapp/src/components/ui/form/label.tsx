import { Typography } from '@mui/material';

type LabelProps = {
   children: React.ReactNode;
};

export const Label = ({ children }: LabelProps) => {
   return (
      <Typography variant="body1" component={'label'}>
         {children}
      </Typography>
   );
};

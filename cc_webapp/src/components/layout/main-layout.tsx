import { Container } from '@mui/material';

import { VBox } from '@/components/ui';

type MainLayoutProps = {
   children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
   // const theme = useTheme();
   // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Container maxWidth={'xs'}>
         <VBox
            sx={{
               height: '100vh',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            {children}
         </VBox>
      </Container>
   );
};

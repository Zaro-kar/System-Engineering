import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/themes';
import { SnackbarProvider } from 'notistack';
import { SomethingWentWrong } from '@/components/errors/something-went-wrong';
import { queryConfig } from '@/libs/react-query';
import { Suspense } from 'react';
import { CenterSpinner } from '@/components/ui';

type AppProviderProps = {
   children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
   const [queryClient] = React.useState(
      () =>
         new QueryClient({
            defaultOptions: queryConfig,
         }),
   );

   return (
      <Suspense fallback={<CenterSpinner />}>
         <ErrorBoundary FallbackComponent={SomethingWentWrong}>
            <QueryClientProvider client={queryClient}>
               {import.meta.env.DEV && <ReactQueryDevtools />}
               <ThemeProvider theme={theme}>
                  <SnackbarProvider maxSnack={5}>
                     <CssBaseline />
                     {children}
                  </SnackbarProvider>
               </ThemeProvider>
            </QueryClientProvider>
         </ErrorBoundary>
      </Suspense>
   );
};

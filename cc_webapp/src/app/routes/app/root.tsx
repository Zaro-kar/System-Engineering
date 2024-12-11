import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { CenterSpinner } from '@/components/ui/spinner';
import { SomethingWentWrong } from '@/components/errors/something-went-wrong';

export const AppRoot = () => {
   const location = useLocation();
   return (
      <Suspense fallback={<CenterSpinner />}>
         <ErrorBoundary
            key={location.pathname}
            FallbackComponent={SomethingWentWrong}
         >
            <Outlet />
         </ErrorBoundary>
      </Suspense>
   );
};

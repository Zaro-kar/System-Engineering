import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { SomethingWentWrong } from '@/components/errors/something-went-wrong';
import { CenterSpinner } from '@/components/ui/spinner';

export const AppRoot = () => {
   const location = useLocation();
   return (
      <Suspense fallback={<CenterSpinner />}>
         <ErrorBoundary key={location.pathname} FallbackComponent={SomethingWentWrong}>
            <Outlet />
         </ErrorBoundary>
      </Suspense>
   );
};

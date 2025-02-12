import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { SomethingWentWrong } from '@/components/errors/something-went-wrong';

export const AppRoot = () => {
   const location = useLocation();
   return (
      <Suspense>
         <ErrorBoundary key={location.pathname} FallbackComponent={SomethingWentWrong}>
            <Outlet />
         </ErrorBoundary>
      </Suspense>
   );
};

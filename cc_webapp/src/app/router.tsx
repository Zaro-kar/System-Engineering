import { QueryClient, useQueryClient } from '@tanstack/react-query';
import {
   createBrowserRouter,
   redirect,
   RouterProvider,
} from 'react-router-dom';
import { useMemo } from 'react';

import { AppRoot } from './routes/app/root';
import { paths } from '@/configs/path';

export const createAppRouter = (queryClient: QueryClient) =>
   createBrowserRouter(
      [
         {
            path: '/',
            element: (
               <AppRoot />
            ),
            children: [
               {
                  path: '/',
                  loader: () => redirect(paths.app.presentation.path),
               },
               {
                  path: paths.app.presentation.path,
                  lazy: async () => {
                     const { PresentationRoute } = await import(
                        './routes/app/presentation'
                     );
                     return { Component: PresentationRoute };
                  },
               },
               {
                  path: paths.app.voting.path,
                  lazy: async () => {
                     const { VotingRoute } = await import(
                        './routes/app/voting'
                     );
                     return { Component: VotingRoute };
                  },
               },
               {
                  path: '*',
                  lazy: async () => {
                     const { NotFoundRoute } = await import(
                        './routes/not-found'
                     );
                     return { Component: NotFoundRoute };
                  },
               },
            ],
         },
      ],
      { basename: '/' },
   );

export const AppRouter = () => {
   const queryClient = useQueryClient();

   const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

   return <RouterProvider router={router} />;
};

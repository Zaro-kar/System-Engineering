import React from 'react';
import { useMemo } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { paths } from '@/configs/path';

import { AppRoot } from './routes/app/root';

export const createAppRouter = () =>
   createBrowserRouter(
      [
         {
            path: '/',
            element: <AppRoot />,
            children: [
               {
                  path: '/',
                  loader: () => redirect(paths.app.home.path),
               },
               {
                  path: paths.app.home.path,
                  lazy: async () => {
                     const { HomeRoute } = await import('./routes/app/home');
                     return { Component: HomeRoute };
                  },
               },
               {
                  path: paths.app.sessionClosed.path,
                  lazy: async () => {
                     const { SessionClosedRoute } = await import('./routes/app/session-closed');
                     return { Component: SessionClosedRoute };
                  },
               },
               {
                  path: paths.app.presentation.path,
                  lazy: async () => {
                     const { PresentationRoute } = await import('./routes/app/presentation');
                     return { Component: PresentationRoute };
                  },
               },
               {
                  path: paths.app.voting.path,
                  lazy: async () => {
                     const { VotingRoute } = await import('./routes/app/voting');
                     return { Component: VotingRoute };
                  },
               },
               {
                  path: '*',
                  lazy: async () => {
                     const { NotFoundRoute } = await import('./routes/not-found');
                     return { Component: NotFoundRoute };
                  },
               },
            ],
         },
      ],
      { basename: '/' },
   );

export const AppRouter = () => {
   const router = useMemo(() => createAppRouter(), []);

   return <RouterProvider router={router} />;
};

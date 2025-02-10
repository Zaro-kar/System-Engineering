import React from 'react';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { useGetSession } from '@/api/get-session';
import { MainLayout } from '@/components/layout/main-layout';
import { WS_URL } from '@/configs';
import { paths } from '@/configs/path';
import { SessionInfo } from '@/features/presentation/components/session-info';
import { WordCloud } from '@/features/presentation/components/word-cloud';

export const PresentationRoute = () => {
   const { session_id } = useParams<{ session_id: string }>();
   const [searchParams] = useSearchParams();
   const isEdit = searchParams.get('edit') === 'true';
   const navigate = useNavigate();

   const sessionQuery = useGetSession({ session_id });

   useEffect(() => {
      if (!session_id) return;
      const socket = new WebSocket(`${WS_URL}/ws/sessions/${session_id}/`);

      socket.onopen = () => {
         console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
         const data = JSON.parse(event.data);
         if (data.type === 'new_words' && data.session === session_id) {
            sessionQuery.refetch();
         }

         if (data.type === 'session_closed') {
            navigate(paths.app.sessionClosed.getHref());
         }
      };

      socket.onerror = (error) => {
         console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
         console.log('WebSocket closed');
      };

      return () => {
         socket.close();
      };
   }, [sessionQuery.data?.session_id, navigate]);

   if (sessionQuery.isFetching) {
      return <Typography>Loading...</Typography>;
   }

   if (sessionQuery.isError) {
      console.log('Error');
      window.location.replace(paths.app.sessionClosed.getHref());
   }

   if (!sessionQuery.data) return null;

   return (
      <MainLayout>
         <Typography variant="h3" align="center">
            CrowdCloud
         </Typography>

         <SessionInfo session={sessionQuery.data} edit={isEdit} />

         <WordCloud words={sessionQuery.data.words} />
      </MainLayout>
   );
};

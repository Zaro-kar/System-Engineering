import { Delete, ExpandMore } from '@mui/icons-material';
import {
   Box,
   Button,
   Typography,
   Accordion,
   AccordionDetails,
   AccordionSummary,
} from '@mui/material';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

import { FRONTEND_URL } from '@/configs';
import { paths } from '@/configs/path';
import { Session } from '@/types/api';

import { useCloseSession } from '../api/close-session';

type SessionInfoProps = {
   session: Session;
   edit?: boolean;
};

export const SessionInfo = ({ session, edit = false }: SessionInfoProps) => {
   const navigate = useNavigate();
   const votingUrl = paths.app.voting.getHref(session.session_id);

   const endSessionMutation = useCloseSession({
      mutationConfig: {
         onSuccess: () => navigate('/'),
         onError: (error) => console.error('Error ending session:', error),
      },
   });

   return (
      <Box width={'100%'}>
         {edit ? (
            <Accordion>
               <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" gutterBottom>
                     Session: {session?.session_code ?? 'Unknown'}
                  </Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 2,
                        gap: 1,
                     }}
                  >
                     <Typography variant="body1">Scan QR Code to Vote</Typography>
                     {votingUrl ? (
                        <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
                           <QRCode value={FRONTEND_URL + votingUrl} size={180} />
                        </Box>
                     ) : (
                        <Typography color="error">Session ID missing</Typography>
                     )}
                     <Button
                        variant="outlined"
                        onClick={() => endSessionMutation.mutate(session.session_id)}
                        sx={{ mt: 2 }}
                        endIcon={<Delete />}
                     >
                        Delete Session
                     </Button>
                  </Box>
               </AccordionDetails>
            </Accordion>
         ) : (
            <Typography align="center" variant="h6" gutterBottom>
               Session: {session?.session_code ?? 'Unknown'}
            </Typography>
         )}
      </Box>
   );
};

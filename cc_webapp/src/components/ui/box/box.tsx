import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type BoxProps = MuiBoxProps;

export const Box = styled(MuiBox)<BoxProps>(() => ({}));

export const HBox = styled(Box)<BoxProps>(() => ({
   display: 'flex',
   gap: '16px',
   flexDirection: 'row',
}));

export const VBox = styled(Box)<BoxProps>(() => ({
   display: 'flex',
   gap: '16px',
   flexDirection: 'column',
}));

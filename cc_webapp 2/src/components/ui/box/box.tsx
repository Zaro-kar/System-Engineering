import { styled } from '@mui/material/styles';
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

type BoxProps = {} & MuiBoxProps;

export const Box = styled(MuiBox)<BoxProps>(({ theme }) => ({}));

export const HBox = styled(Box)<BoxProps>(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   flexDirection: 'row',
}));

export const VBox = styled(Box)<BoxProps>(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   flexDirection: 'column',
}));

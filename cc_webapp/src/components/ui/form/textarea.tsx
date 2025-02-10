import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapperPassThoughProps } from './field-wrapper';

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'> &
   FieldWrapperPassThoughProps & {
      registration: Partial<UseFormRegisterReturn>;
   };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ error, registration, ...props }, ref) => {
      return (
         <TextField
            multiline
            minRows={3}
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            fullWidth
            inputRef={ref}
            {...registration}
            {...(props as TextFieldProps)}
         />
      );
   },
);

Textarea.displayName = 'Textarea';

export { Textarea };

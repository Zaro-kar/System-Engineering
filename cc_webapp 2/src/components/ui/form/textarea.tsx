import * as React from 'react';
import { FieldWrapperPassThoughProps } from './field-wrapper';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export type TextareaProps = Omit<
   React.TextareaHTMLAttributes<HTMLTextAreaElement>,
   'color'
> &
   FieldWrapperPassThoughProps & {
      registration: Partial<UseFormRegisterReturn>;
   };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ label, error, registration, ...props }, ref) => {
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

import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapperPassThoughProps } from './field-wrapper';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
   FieldWrapperPassThoughProps & {
      registration: Partial<UseFormRegisterReturn>;
      maxRows?: number;
      multiline?: boolean;
   };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ type, label, error, registration, maxRows, multiline, ...props }, ref) => {
      return (
         <TextField
            maxRows={maxRows}
            multiline={multiline}
            label={label}
            type={type}
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            fullWidth
            inputRef={ref}
            InputLabelProps={{
               style: { color: '#37363F', fontSize: '16px' },
            }}
            {...registration}
            {...(props as TextFieldProps)}
         />
      );
   },
);

Input.displayName = 'Input';

export { Input };

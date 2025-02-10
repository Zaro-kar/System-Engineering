import React from 'react';
import {
   MenuItem,
   Select,
   FormControl,
   InputLabel,
   CircularProgress,
   Box,
   FormHelperText,
} from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapperPassThoughProps } from './field-wrapper';

type Option = {
   label: React.ReactNode;
   value: string | number | string[];
   disabled?: boolean;
};

type SelectFieldProps = FieldWrapperPassThoughProps & {
   options: Option[];
   type: 'number' | 'string';
   className?: string;
   defaultValue?: string | number;
   registration: Partial<UseFormRegisterReturn>;
   disabled?: boolean;
   loading?: boolean;
};

export const SelectField = (props: SelectFieldProps) => {
   const {
      type,
      label,
      options,
      error,
      className,
      defaultValue,
      registration,
      disabled = false,
      loading = false,
   } = props;

   return (
      <FormControl
         fullWidth
         error={!!error}
         variant="outlined"
         className={className}
         disabled={disabled || loading}
      >
         <InputLabel>{label}</InputLabel>
         <Select
            defaultValue={defaultValue ? defaultValue : type === 'number' ? 0 : ''}
            label={label}
            {...registration}
         >
            {loading ? (
               <MenuItem disabled>
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                     <CircularProgress size={24} />
                  </Box>
               </MenuItem>
            ) : (
               options.map(({ label, value, disabled = false }) => (
                  <MenuItem key={value.toString()} value={value} disabled={disabled}>
                     {label}
                  </MenuItem>
               ))
            )}
         </Select>
         {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
   );
};

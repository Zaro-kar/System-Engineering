import {
   Switch as MUISwitch,
   FormControlLabel,
   SwitchProps as MUISwitchProps,
} from '@mui/material';
import React from 'react';

type CustomSwitchProps = MUISwitchProps & {
   label?: string | React.ReactNode;
   className?: string;
};

const Switch = React.forwardRef<HTMLInputElement, CustomSwitchProps>(
   ({ className, label, ...props }, ref) => {
      if (label) {
         return (
            <FormControlLabel
               control={<MUISwitch className={className} inputRef={ref} {...props} />}
               label={label}
            />
         );
      }

      return <MUISwitch className={className} inputRef={ref} {...props} />;
   },
);

Switch.displayName = 'Switch';

export { Switch };

import { type FieldError } from 'react-hook-form';

type FieldWrapperProps = {
   label?: string;
   className?: string;
   children: React.ReactNode;
   error?: FieldError | undefined;
};

export type FieldWrapperPassThoughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

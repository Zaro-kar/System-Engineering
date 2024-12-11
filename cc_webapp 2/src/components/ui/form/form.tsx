import * as React from 'react';
import {
   Controller,
   ControllerProps,
   FieldPath,
   FieldValues,
   FormProvider,
   SubmitHandler,
   UseFormProps,
   UseFormReturn,
   useForm,
   useFormContext,
} from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Box,
   FormControl as MUIFormControl,
   FormControlProps,
   FormHelperText,
   InputLabel,
   InputLabelProps,
   Typography,
} from '@mui/material';

type FormFieldContextValue<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
   name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
   {} as FormFieldContextValue,
);

const FormField = <
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
   ...props
}: ControllerProps<TFieldValues, TName>) => {
   return (
      <FormFieldContext.Provider value={{ name: props.name }}>
         <Controller {...props} />
      </FormFieldContext.Provider>
   );
};

const useFormField = () => {
   const fieldContext = React.useContext(FormFieldContext);
   const itemContext = React.useContext(FormItemContext);
   const { getFieldState, formState } = useFormContext();

   if (!fieldContext) {
      throw new Error('useFormField should be used within <FormField>');
   }

   const fieldState = getFieldState(fieldContext.name, formState);
   const { id } = itemContext;

   return {
      id,
      name: fieldContext.name,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
      ...fieldState,
   };
};

type FormItemContextValue = {
   id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
   {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
   const id = React.useId();

   return (
      <FormItemContext.Provider value={{ id }}>
         <Box ref={ref} className={className} {...props} />
      </FormItemContext.Provider>
   );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
   HTMLLabelElement,
   InputLabelProps
>(({ className, ...props }, ref) => {
   const { error, formItemId } = useFormField();

   return (
      <InputLabel
         ref={ref}
         htmlFor={formItemId}
         className={className}
         error={!!error}
         {...props}
      />
   );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
   HTMLDivElement,
   FormControlProps
>(({ className, ...props }, ref) => {
   const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();

   return (
      <MUIFormControl
         ref={ref}
         error={!!error}
         className={className}
         id={formItemId}
         aria-describedby={
            !error
               ? `${formDescriptionId}`
               : `${formDescriptionId} ${formMessageId}`
         }
         aria-invalid={!!error}
         {...props}
      />
   );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
   HTMLParagraphElement,
   React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
   const { formDescriptionId } = useFormField();

   return (
      <Typography
         ref={ref}
         id={formDescriptionId}
         variant="body2"
         color="textSecondary"
         className={className}
         {...props}
      />
   );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
   HTMLParagraphElement,
   React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
   const { error, formMessageId } = useFormField();
   const body = error ? String(error?.message) : children;

   if (!body) {
      return null;
   }

   return (
      <FormHelperText
         ref={ref}
         id={formMessageId}
         className={className}
         {...props}
      >
         {body}
      </FormHelperText>
   );
});
FormMessage.displayName = 'FormMessage';

type FormProps<TFormValues extends FieldValues, Schema> = {
   onSubmit: SubmitHandler<TFormValues>;
   schema: Schema;
   className?: string;
   children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
   options?: UseFormProps<TFormValues>;
   id?: string;
};

const Form = <
   Schema extends ZodType<any, any, any>,
   TFormValues extends FieldValues = z.infer<Schema>,
>({
   onSubmit,
   children,
   className,
   options,
   id,
   schema,
}: FormProps<TFormValues, Schema>) => {
   const form = useForm({ ...options, resolver: zodResolver(schema) });
   return (
      <FormProvider {...form}>
         <form
            className={className}
            onSubmit={form.handleSubmit(onSubmit)}
            id={id}
         >
            {children(form)}
         </form>
      </FormProvider>
   );
};

export {
   useFormField,
   Form,
   FormProvider,
   FormItem,
   FormLabel,
   FormControl,
   FormDescription,
   FormMessage,
   FormField,
};

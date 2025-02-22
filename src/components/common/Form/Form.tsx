import React from 'react';
import {
  UseFormReturn,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { FormContainer } from './Form.styles';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </FormContainer>
    </FormProvider>
  );
} 
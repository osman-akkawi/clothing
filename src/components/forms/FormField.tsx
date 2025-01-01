import React from 'react';
import Input, { InputProps } from '../ui/Input';

interface FormFieldProps extends InputProps {
  name: string;
  register: any;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  register,
  error,
  ...props
}) => {
  return (
    <Input
      {...register(name)}
      error={error}
      {...props}
    />
  );
};

export default FormField;
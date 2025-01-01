import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../utils/validation';
import Button from '../ui/Button';
import FormField from './FormField';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
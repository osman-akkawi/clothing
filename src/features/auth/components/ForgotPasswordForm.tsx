import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../../store/authStore';
import { forgotPasswordSchema } from '../schemas';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

type ForgotPasswordFormData = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const { resetPassword } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      toast.success('Password reset instructions have been sent to your email');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Send Reset Instructions
      </Button>
    </form>
  );
};
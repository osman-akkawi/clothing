import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { supabase } from '../../../lib/supabase';
import { resetPasswordSchema } from '../schemas';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) throw error;

      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="New Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  );
};
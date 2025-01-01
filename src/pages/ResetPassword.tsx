import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import { ResetPasswordForm } from '../features/auth/components/ResetPasswordForm';
import { useAuthRedirect } from '../features/auth/hooks/useAuthRedirect';

const ResetPassword = () => {
  useAuthRedirect({ 
    fallbackPath: '/forgot-password',
    requireHash: true 
  });

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive password reset instructions"
      linkText="Remember your password?"
      linkTo="/login"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
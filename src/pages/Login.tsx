import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/forms/LoginForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { isSubmitting, handleLogin } = useAuth();

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      linkText="Don't have an account?"
      linkTo="/register"
    >
      <LoginForm onSubmit={handleLogin} isSubmitting={isSubmitting} />
      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
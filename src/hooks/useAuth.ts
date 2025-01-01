import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface AuthCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (credentials: AuthCredentials) => {
    try {
      setIsSubmitting(true);
      await signIn(credentials.email, credentials.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (credentials: AuthCredentials) => {
    try {
      setIsSubmitting(true);
      await signUp(credentials.email, credentials.password);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleLogin,
    handleRegister,
  };
};
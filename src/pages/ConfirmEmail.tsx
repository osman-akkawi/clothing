import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { EmailConfirmationComponent } from '../features/auth/components/EmailConfirmation';
import AuthLayout from '../components/auth/AuthLayout';

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  React.useEffect(() => {
    const handleEmailConfirmation = async () => {
      const hash = window.location.hash;
      
      if (!hash || !hash.includes('access_token')) {
        if (!email) {
          navigate('/login');
        }
        return;
      }

      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        
        navigate('/login');
      } catch (error) {
        console.error('Error confirming email:', error);
        navigate('/login');
      }
    };

    handleEmailConfirmation();
  }, [navigate, email]);

  if (!email) {
    return null;
  }

  return (
    <AuthLayout
      title="Confirm your email"
      subtitle="Please check your email to complete registration"
    >
      <EmailConfirmationComponent email={email} />
    </AuthLayout>
  );
};

export default ConfirmEmail;
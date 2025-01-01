import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'react-hot-toast';
import Button from '../../../components/ui/Button';

interface EmailConfirmationProps {
  email: string;
}

export const EmailConfirmationComponent: React.FC<EmailConfirmationProps> = ({ email }) => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = React.useState(false);

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm-email`
        }
      });
      
      if (error) throw error;
      
      toast.success('Confirmation email has been resent');
    } catch (error) {
      toast.error('Failed to resend confirmation email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
        <Mail className="w-8 h-8 text-indigo-600" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="text-gray-600">
          We've sent a confirmation link to <span className="font-medium">{email}</span>
        </p>
        <p className="text-sm text-gray-500">
          Click the link to activate your account and start shopping
        </p>
      </div>

      <div className="space-y-4 w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResendEmail}
          isLoading={isResending}
        >
          Resend Confirmation Email
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/login')}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Return to Login
        </Button>
      </div>
    </div>
  );
};
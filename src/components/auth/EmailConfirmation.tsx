import React from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';

interface EmailConfirmationProps {
  email: string;
  onResendEmail: () => Promise<void>;
  isResending: boolean;
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  email,
  onResendEmail,
  isResending
}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
        <Mail className="w-8 h-8 text-indigo-600" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          We've sent a confirmation link to <span className="font-medium">{email}</span>.
          Click the link to activate your account.
        </p>
        <p className="text-sm text-gray-500">
          If you don't see the email, check your spam folder.
        </p>
      </div>

      <div className="space-y-4 w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={onResendEmail}
          isLoading={isResending}
        >
          Resend Confirmation Email
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmation;
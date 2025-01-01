import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLinkProps {
  text: string;
  to: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ text, to }) => {
  const linkText = to === '/register' ? 'Sign up' : 'Sign in';

  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {text}{' '}
      <Link to={to} className="text-indigo-600 hover:text-indigo-500">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthLink;
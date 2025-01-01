import React from 'react';

interface AuthTitleProps {
  title: string;
  subtitle?: string;
}

const AuthTitle: React.FC<AuthTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default AuthTitle;
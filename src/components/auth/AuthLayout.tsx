import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLink from './AuthLink';
import AuthTitle from './AuthTitle';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkTo?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100">
          <AuthTitle title={title} subtitle={subtitle} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
          {linkText && linkTo && <AuthLink text={linkText} to={linkTo} />}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
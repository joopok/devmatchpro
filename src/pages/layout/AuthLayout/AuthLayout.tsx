import React from 'react';
import { AuthContainer, AuthContent } from './AuthLayout.styles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthContainer>
      <AuthContent>
        {children}
      </AuthContent>
    </AuthContainer>
  );
}; 
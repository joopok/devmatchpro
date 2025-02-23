import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.5rem;
`;

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <CardContainer className={className}>{children}</CardContainer>;
}; 
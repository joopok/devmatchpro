import React from 'react';
import { CardContainer } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  style,
  className,
  selected,
}) => {
  return (
    <CardContainer onClick={onClick} style={style} className={className}>
      {children}
    </CardContainer>
  );
};

export * from './Card.styles';
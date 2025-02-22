import React from 'react';
import styled from 'styled-components';

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
    <Container onClick={onClick} style={style} className={className}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`; 
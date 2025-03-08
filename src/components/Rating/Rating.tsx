import React from 'react';
import styled from '@emotion/styled';

interface RatingProps {
  value?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange?: (value: number) => void;
  text?: string;
}

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  color: #ffd700;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  readOnly = false,
  size = 'medium',
  onChange,
  text
}) => (
  <RatingContainer>
    <Stars>{'★'.repeat(Math.round(value))}</Stars>
    <ReviewCount>({text})</ReviewCount>
  </RatingContainer>
); 
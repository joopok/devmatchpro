import React from 'react';
import styled from 'styled-components';

interface TrendIndicatorProps {
  positive: boolean;
  children: React.ReactNode;
}

const Indicator = styled.span<{ positive: boolean }>`
  color: ${({ positive }) => (positive ? 'green' : 'red')};
  font-weight: bold;
`;

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ positive, children }) => (
  <Indicator positive={positive}>{children}</Indicator>
); 
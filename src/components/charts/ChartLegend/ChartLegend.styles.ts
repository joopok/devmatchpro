import styled from 'styled-components';

export const LegendContainer = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ $orientation }) => 
    $orientation === 'vertical' ? 'column' : 'row'};
  gap: 8px;
`;

export const LegendItem = styled.div<{ $isClickable: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $isClickable }) => $isClickable ? 'pointer' : 'default'};
  opacity: ${({ $isActive }) => $isActive ? 1 : 0.5};
`;

export const ColorIndicator = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ $color }) => $color};
`;

export const LegendLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ValueLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 
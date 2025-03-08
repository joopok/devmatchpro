import styled from 'styled-components';

export const FilterContainer = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const FilterTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterCheckbox = styled.input`
  margin: 0;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`; 
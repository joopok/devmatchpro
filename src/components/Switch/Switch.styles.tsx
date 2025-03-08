import styled from 'styled-components';

export const SwitchContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SwitchLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`; 
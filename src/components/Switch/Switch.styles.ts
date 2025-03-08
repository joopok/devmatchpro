import styled from 'styled-components';

export const SwitchContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const SwitchInput = styled.input`
  position: relative;
  width: 36px;
  height: 20px;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  transition: all 0.3s;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s;
  }

  &:checked:before {
    transform: translateX(16px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SwitchLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`; 
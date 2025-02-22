import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface SelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: Array<{ value: string; label: string }>;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onChange, options, label, error, helperText, disabled, multiple, placeholder = '선택하세요' }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    };

    return (
      <SelectContainer>
        {label && <Label>{label}</Label>}
        <StyledSelect
          ref={ref}
          value={value}
          onChange={handleChange}
          $error={error}
          disabled={disabled}
          multiple={multiple}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      </SelectContainer>
    );
  }
);

const SelectContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledSelect = styled.select<{ $error?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  border: 1px solid ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }

  option {
    padding: 8px;
  }

  option:disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const HelperText = styled.span<{ $error?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.textSecondary};
`; 

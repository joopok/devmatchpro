import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className,
}, ref) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CheckboxContainer className={className} onClick={handleClick}>
      <HiddenCheckbox
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        indeterminate={indeterminate}
      >
        {checked && !indeterminate && <CheckIcon>✓</CheckIcon>}
        {indeterminate && <IndeterminateIcon>−</IndeterminateIcon>}
      </StyledCheckbox>
      {label && <Label disabled={disabled}>{label}</Label>}
    </CheckboxContainer>
  );
});

Checkbox.displayName = 'Checkbox';

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div<{
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
}>`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme, checked, disabled }) =>
    disabled
      ? theme.colors.border
      : checked
      ? theme.colors.primary
      : theme.colors.border};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, checked, disabled }) =>
    disabled
      ? theme.colors.backgroundAlt
      : checked
      ? theme.colors.primary
      : theme.colors.surface};
  transition: all 0.2s ease;
`;

const CheckIcon = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  line-height: 1;
`;

const IndeterminateIcon = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  line-height: 1;
`;

const Label = styled.span<{ disabled: boolean }>`
  font-size: 14px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textSecondary : theme.colors.text};
`; 
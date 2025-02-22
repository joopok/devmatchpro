import React from 'react';
import * as S from './Switch.styles';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <S.SwitchContainer>
      <S.SwitchInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      {label && <S.SwitchLabel>{label}</S.SwitchLabel>}
    </S.SwitchContainer>
  );
}; 
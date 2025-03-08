import React from 'react';
import styled from '@emotion/styled';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
`;

const StyledColorPicker = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <ColorPickerContainer>
      {label && <Label>{label}</Label>}
      <StyledColorPicker
        type="color"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </ColorPickerContainer>
  );
}; 
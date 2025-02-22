import React from 'react';
import styled from 'styled-components';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <SliderContainer>
      {label && <Label>{label}</Label>}
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </SliderContainer>
  );
}; 
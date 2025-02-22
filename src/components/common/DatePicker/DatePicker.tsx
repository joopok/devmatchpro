import React from 'react';
import ReactDatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Control, Controller } from 'react-hook-form';

interface CustomDatePickerProps {
  label?: string;
  name: string;
  control: Control<any>;
  rules?: object;
  error?: boolean;
  helperText?: string;
}

const StyledDatePicker = styled(ReactDatePicker)`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &.error {
    border-color: ${({ theme }) => theme.colors.error};
  }
` as typeof ReactDatePicker;

export const DatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  control,
  rules,
  error,
  helperText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...field } }) => (
        <Container>
          {label && <Label>{label}</Label>}
          <StyledDatePicker
            {...field}
            selected={value}
            onChange={(date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
              onChange(date);
            }}
            className={error ? 'error' : ''}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
            isClearable
            showYearDropdown
            showMonthDropdown
          />
          {helperText && <HelperText $error={error}>{helperText}</HelperText>}
        </Container>
      )}
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.textSecondary};
`;
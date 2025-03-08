import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Control, Controller } from 'react-hook-form';
import { ko } from 'date-fns/locale';

// 한국어 로케일 등록
// TypeScript 오류를 해결하기 위해 타입 단언(type assertion) 사용
registerLocale('ko', ko as any);

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface CustomDatePickerProps {
  label?: string;
  name: string;
  control?: Control<any>;
  rules?: object;
  error?: boolean;
  helperText?: string;
  onChange?: (date: Date | null | DateRange) => void;
  value?: Date | null | DateRange;
  selectsRange?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  disabled?: boolean;
  locale?: string;
  dateFormat?: string;
  placeholderText?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  timeCaption?: string;
  className?: string;
}

const StyledDatePicker = styled(ReactDatePicker)<{ $error?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
` as any;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

export const DatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  control,
  rules,
  error,
  helperText,
  onChange,
  value,
  selectsRange = false,
  startDate,
  endDate,
  disabled = false,
  locale = 'ko',
  dateFormat = 'yyyy-MM-dd',
  placeholderText = '날짜 선택',
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  timeIntervals = 30,
  timeCaption = '시간',
  className,
}) => {
  // React Hook Form을 사용하는 경우
  if (control) {
    return (
      <Container className={className}>
        {label && <Label>{label}</Label>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <StyledDatePicker
              $error={error}
              onChange={(date: any) => {
                field.onChange(date);
                if (onChange) onChange(date as any);
              }}
              selected={field.value}
              selectsRange={selectsRange}
              startDate={selectsRange ? startDate : undefined}
              endDate={selectsRange ? endDate : undefined}
              disabled={disabled}
              locale={locale}
              dateFormat={dateFormat}
              placeholderText={placeholderText}
              showTimeSelect={showTimeSelect}
              timeFormat={timeFormat}
              timeIntervals={timeIntervals}
              timeCaption={timeCaption}
            />
          )}
        />
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      </Container>
    );
  }

  // 단독으로 사용하는 경우
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <StyledDatePicker
        $error={error}
        onChange={onChange}
        selected={selectsRange ? startDate : value as Date | null}
        selectsRange={selectsRange}
        startDate={selectsRange ? startDate : undefined}
        endDate={selectsRange ? endDate : undefined}
        disabled={disabled}
        locale={locale}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        timeCaption={timeCaption}
      />
      {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </Container>
  );
};
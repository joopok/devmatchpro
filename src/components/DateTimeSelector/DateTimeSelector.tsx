import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Control, Controller } from 'react-hook-form';
import { ko } from 'date-fns/locale';

// 한국어 로케일 등록
registerLocale('ko', ko as any);

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface TimeRange {
  start: string;
  end: string;
}

type DateTimeSelectorMode = 'date' | 'dateRange' | 'time' | 'dateTime';

interface DateTimeSelectorProps {
  mode?: DateTimeSelectorMode;
  label?: string;
  name?: string;
  control?: Control<any>;
  rules?: object;
  error?: boolean;
  helperText?: string;
  onChange?: (value: Date | null | DateRange | TimeRange | string) => void;
  value?: Date | null | DateRange | TimeRange | string;
  startDate?: Date | null | string;
  endDate?: Date | null | string;
  // TimeSelect 호환성을 위한 prop
  start?: string;
  end?: string;
  timeStart?: string;
  timeEnd?: string;
  disabled?: boolean;
  locale?: string;
  dateFormat?: string;
  placeholderText?: string;
  timeFormat?: string;
  timeIntervals?: number;
  timeCaption?: string;
  className?: string;
}

// 스타일 컴포넌트
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

const TimeSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TimeInput = styled.input<{ $error?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

// 문자열을 Date 객체로 변환하는 도우미 함수
const stringToDate = (dateStr: string | Date | null | undefined): Date | null => {
  if (dateStr === null || dateStr === undefined) return null;
  if (dateStr instanceof Date) return dateStr;
  return new Date(dateStr);
};

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  mode = 'date',
  label,
  name,
  control,
  rules,
  error,
  helperText,
  onChange,
  value,
  startDate,
  endDate,
  // TimeSelect 호환성을 위한 prop
  start,
  end,
  timeStart = '09:00',
  timeEnd = '18:00',
  disabled = false,
  locale = 'ko',
  dateFormat = 'yyyy-MM-dd',
  placeholderText = '날짜 선택',
  timeFormat = 'HH:mm',
  timeIntervals = 30,
  timeCaption = '시간',
  className,
}) => {
  // 시간 범위 선택기 렌더링
  const renderTimeSelect = () => {
    // TimeSelect 호환성: start/end를 우선 사용
    const actualTimeStart = start || timeStart;
    const actualTimeEnd = end || timeEnd;
    
    const timeValue = typeof value === 'object' && value !== null && 'start' in value
      ? value as TimeRange
      : { start: actualTimeStart, end: actualTimeEnd };
    
    return (
      <TimeSelectContainer>
        <TimeInput
          type="time"
          value={timeValue.start}
          onChange={(e) => {
            const newValue = { start: e.target.value, end: timeValue.end };
            if (onChange) onChange(newValue);
          }}
          disabled={disabled}
          $error={error}
        />
        <span>~</span>
        <TimeInput
          type="time"
          value={timeValue.end}
          onChange={(e) => {
            const newValue = { start: timeValue.start, end: e.target.value };
            if (onChange) onChange(newValue);
          }}
          disabled={disabled}
          $error={error}
        />
      </TimeSelectContainer>
    );
  };

  // 날짜 선택기 렌더링
  const renderDatePicker = (selectsRange = false) => {
    // 문자열인 경우 Date 객체로 변환
    const startDateObj = stringToDate(startDate);
    const endDateObj = stringToDate(endDate);
    
    // React Hook Form을 사용하는 경우
    if (control && name) {
      return (
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
              selected={field.value instanceof Date ? field.value : null}
              selectsRange={selectsRange}
              startDate={selectsRange ? startDateObj : undefined}
              endDate={selectsRange ? endDateObj : undefined}
              disabled={disabled}
              locale={locale}
              dateFormat={dateFormat}
              placeholderText={placeholderText}
              showTimeSelect={mode === 'dateTime'}
              timeFormat={timeFormat}
              timeIntervals={timeIntervals}
              timeCaption={timeCaption}
            />
          )}
        />
      );
    }

    // 단독으로 사용하는 경우
    const selectedValue = typeof value === 'string' ? new Date(value) : 
                         (value instanceof Date ? value : null);
    
    return (
      <StyledDatePicker
        $error={error}
        onChange={onChange}
        selected={selectsRange ? startDateObj : selectedValue}
        selectsRange={selectsRange}
        startDate={selectsRange ? startDateObj : undefined}
        endDate={selectsRange ? endDateObj : undefined}
        disabled={disabled}
        locale={locale}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        showTimeSelect={mode === 'dateTime'}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        timeCaption={timeCaption}
      />
    );
  };

  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      
      {/* 모드에 따라 다른 컴포넌트 렌더링 */}
      {mode === 'date' && renderDatePicker(false)}
      {mode === 'dateRange' && renderDatePicker(true)}
      {mode === 'time' && renderTimeSelect()}
      {mode === 'dateTime' && renderDatePicker(false)}
      
      {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </Container>
  );
};

// 기존 컴포넌트를 위한 별칭 생성
export const DatePicker = (props: DateTimeSelectorProps) => {
  return <DateTimeSelector {...props} mode="date" />;
};

export const DateRangePicker = (props: DateTimeSelectorProps) => {
  return <DateTimeSelector {...props} mode="dateRange" />;
};

export const TimeSelect = (props: DateTimeSelectorProps) => {
  return <DateTimeSelector {...props} mode="time" />;
}; 
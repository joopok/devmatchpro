import React from 'react';
import * as S from './DateRangePicker.styles';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (range: DateRange) => void;
  disabled?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate = '',
  endDate = '',
  onChange,
  disabled = false,
}) => {
  return (
    <S.Container>
      <S.DateInput
        type="date"
        value={startDate}
        onChange={(e) => onChange({ start: e.target.value, end: endDate })}
        disabled={disabled}
      />
      <S.Separator>~</S.Separator>
      <S.DateInput
        type="date"
        value={endDate}
        onChange={(e) => onChange({ start: startDate, end: e.target.value })}
        disabled={disabled}
      />
    </S.Container>
  );
}; 
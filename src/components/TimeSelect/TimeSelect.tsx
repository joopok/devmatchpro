import React from 'react';
import styled from 'styled-components';

interface TimeSelectProps {
  start: string;
  end: string;
  onChange: (range: { start: string; end: string }) => void;
  disabled?: boolean;
}

const TimeSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const TimeSelect: React.FC<TimeSelectProps> = ({
  start,
  end,
  onChange,
  disabled,
}) => {
  return (
    <TimeSelectContainer>
      <input
        type="time"
        value={start}
        onChange={(e) => onChange({ start: e.target.value, end })}
        disabled={disabled}
      />
      <span>~</span>
      <input
        type="time"
        value={end}
        onChange={(e) => onChange({ start, end: e.target.value })}
        disabled={disabled}
      />
    </TimeSelectContainer>
  );
}; 
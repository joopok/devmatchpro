import React from 'react';
import styled from 'styled-components';

interface TimelineItemType {
  id: string;
  title: string;
  status: string;
  startDate?: string;
  endDate?: string;
  onClick?: () => void;
}

interface TimelineProps {
  items: TimelineItemType[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item) => (
        <TimelineItemContainer key={item.id} onClick={item.onClick}>
          <TimelineDot $status={item.status} />
          <TimelineContent>
            <Title>{item.title}</Title>
            {item.startDate && <Date>{item.startDate}</Date>}
          </TimelineContent>
        </TimelineItemContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineItemContainer = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const TimelineDot = styled.div<{ $status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.success;
      case 'failed':
        return theme.colors.error;
      case 'in_progress':
        return theme.colors.warning;
      default:
        return theme.colors.border;
    }
  }};
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
`;

const Date = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 
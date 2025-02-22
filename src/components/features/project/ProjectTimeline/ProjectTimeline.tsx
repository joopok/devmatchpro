import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface ProjectTimelineProps {
  milestones: Milestone[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ milestones }) => {
  return (
    <Container>
      {milestones.map((milestone) => (
        <TimelineItem key={milestone.id}>
          <TimelineDot $status={milestone.status} />
          <TimelineContent>
            <EventHeader>
              <EventTitle>{milestone.title}</EventTitle>
              <EventDate>
                {format(new Date(milestone.dueDate), 'PPP', { locale: ko })}
              </EventDate>
            </EventHeader>
            <EventDescription>{milestone.description}</EventDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 11px;
    top: 40px;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const TimelineDot = styled.div<{ $status: Milestone['status'] }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      default:
        return theme.colors.textSecondary;
    }
  }};
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const EventTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const EventDate = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EventDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;
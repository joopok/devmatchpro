import React from 'react';
import { CircularProgress } from '../../Progress/CircularProgress';
import { LinearProgress } from '../../Progress/LinearProgress';
import { Tag } from '../../Tag';
import {
  ProgressContainer,
  ProgressHeader,
  StatusSection,
  MilestoneSection,
  MilestoneList,
  MilestoneItem,
  TimelineSection,
  Stats,
  StatItem,
} from './ProjectProgress.styles';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'DELAYED';
  progress: number;
}

interface ProjectProgressProps {
  projectId: string;
  totalProgress: number;
  timeProgress: number;
  budgetProgress: number;
  milestones: Milestone[];
  startDate: string;
  endDate: string;
  status: string;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  projectId,
  totalProgress,
  timeProgress,
  budgetProgress,
  milestones,
  startDate,
  endDate,
  status,
}) => {
  const getStatusColor = (status: string): 'default' | 'error' | 'success' | 'warning' | 'info' => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'info';
      case 'DELAYED':
        return 'error';
      case 'NOT_STARTED':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateDaysLeft = () => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ProgressContainer>
      <ProgressHeader>
        <h2>프로젝트 진행 현황</h2>
        <Tag
          label={status}
          color={getStatusColor(status)}
        />
      </ProgressHeader>

      <StatusSection>
        <Stats>
          <StatItem>
            <CircularProgress
              value={totalProgress}
              size={120}
              label="전체 진행률"
            />
          </StatItem>
          <StatItem>
            <h4>일정 진행률</h4>
            <LinearProgress
              progress={timeProgress}
              color={timeProgress < totalProgress ? 'warning' : 'success'}
            />
          </StatItem>
          <StatItem>
            <h4>예산 집행률</h4>
            <LinearProgress
              progress={budgetProgress}
              color={budgetProgress > totalProgress ? 'warning' : 'success'}
            />
          </StatItem>
        </Stats>
      </StatusSection>

      <TimelineSection>
        <div>
          <h4>프로젝트 기간</h4>
          <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
          <p>남은 기간: {calculateDaysLeft()}일</p>
        </div>
      </TimelineSection>

      <MilestoneSection>
        <h3>마일스톤 진행 현황</h3>
        <MilestoneList>
          {milestones.map((milestone) => (
            <MilestoneItem
              key={milestone.id}
              status={milestone.status}
            >
              <div>
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
                <p>마감일: {formatDate(milestone.dueDate)}</p>
              </div>
              <div>
                <CircularProgress
                  value={milestone.progress}
                  size={60}
                  color={getStatusColor(milestone.status)}
                />
                <Tag
                  label={milestone.status}
                  color={getStatusColor(milestone.status)}
                />
              </div>
            </MilestoneItem>
          ))}
        </MilestoneList>
      </MilestoneSection>
    </ProgressContainer>
  );
}; 
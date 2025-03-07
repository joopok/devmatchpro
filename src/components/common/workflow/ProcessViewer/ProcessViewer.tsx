import React, { useState } from 'react';
import { Timeline } from '../../../common/Timeline';
import { Card } from '../../../common/Card';
import { Tag } from '../../../common/Tag';
import { Button } from '../../../common/Button';
import {
  ViewerContainer,
  ProcessHeader,
  StageDetails,
  ActivityLog,
  ParticipantList,
} from './ProcessViewer.styles';
import { formatDateTime } from '../../../../utils/date';

interface ProcessStage {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  data?: Record<string, any>;
}

interface ProcessActivity {
  id: string;
  type: 'comment' | 'status_change' | 'assignment';
  timestamp: string;
  description: string;
  actor: {
    id: string;
    name: string;
  };
}

interface Participant {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  joinedAt: string;
  lastActiveAt?: string;
}

interface ProcessViewerProps {
  processId: string;
  name: string;
  description: string;
  status: string;
  stages: ProcessStage[];
  activities: ProcessActivity[];
  participants: Participant[];
  onStageAction?: (stageId: string, action: string) => Promise<void>;
  onAddParticipant?: (type: string) => Promise<void>;
  isLoading?: boolean;
  selectedStage: ProcessStage | null;
  onStageSelect: (stage: ProcessStage) => void;
}

export const ProcessViewer: React.FC<ProcessViewerProps> = ({
  processId,
  name,
  description,
  status,
  stages,
  activities,
  participants,
  onStageAction,
  onAddParticipant,
  isLoading,
  selectedStage,
  onStageSelect,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'in_progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'stage_change':
        return '🔄';
      case 'comment':
        return '💬';
      case 'document':
        return '📄';
      case 'approval':
        return '✅';
      default:
        return '📌';
    }
  };

  return (
    <ViewerContainer>
      <ProcessHeader>
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
          <Tag label={status} color={getStatusColor(status) as 'default' | 'success' | 'error' | 'warning'} />
        </div>
        <div>
          <small>프로세스 ID: {processId}</small>
        </div>
      </ProcessHeader>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 2 }}>
          <Timeline
            items={stages.map((stage) => ({
              id: stage.id,
              title: stage.name,
              status: stage.status,
              startDate: stage.startedAt,
              endDate: stage.completedAt,
              onClick: () => onStageSelect(stage),
            }))}
          />

          {selectedStage && (
            <StageDetails>
              <Card>
                <h3>{selectedStage.name}</h3>
                <Tag
                  label={selectedStage.status}
                  color={getStatusColor(selectedStage.status) as 'default' | 'success' | 'error' | 'warning'}
                />
                {selectedStage.assignee && (
                  <p>담당자: {selectedStage.assignee.name}</p>
                )}
                {selectedStage.startedAt && (
                  <p>시작: {formatDateTime(selectedStage.startedAt)}</p>
                )}
                {selectedStage.completedAt && (
                  <p>완료: {formatDateTime(selectedStage.completedAt)}</p>
                )}
                {selectedStage.data && (
                  <pre>{JSON.stringify(selectedStage.data, null, 2)}</pre>
                )}
                {onStageAction && selectedStage.status === 'in_progress' && (
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => onStageAction(selectedStage.id, 'complete')}
                      disabled={isLoading}
                    >
                      완료
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => onStageAction(selectedStage.id, 'fail')}
                      disabled={isLoading}
                    >
                      실패
                    </Button>
                  </div>
                )}
              </Card>
            </StageDetails>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <ParticipantList>
            <h3>참여자</h3>
            {participants.map((participant) => (
              <div key={participant.id}>
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  width={32}
                  height={32}
                />
                <div>
                  <strong>{participant.name}</strong>
                  <Tag label={participant.role} />
                  <small>
                    참여: {formatDateTime(participant.joinedAt)}
                  </small>
                  {participant.lastActiveAt && (
                    <small>
                      최근 활동: {formatDateTime(participant.lastActiveAt)}
                    </small>
                  )}
                </div>
              </div>
            ))}
            {onAddParticipant && (
              <Button
                variant="outline"
                onClick={() => onAddParticipant('member')}
                disabled={isLoading}
              >
                참여자 추가
              </Button>
            )}
          </ParticipantList>

          <ActivityLog>
            <h3>활동 기록</h3>
            {activities.map((activity) => (
              <div key={activity.id}>
                <span>{getActivityIcon(activity.type)}</span>
                <div>
                  <p>{activity.description}</p>
                  {activity.actor && (
                    <small>
                      {activity.actor.name} •{' '}
                      {formatDateTime(activity.timestamp)}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </ActivityLog>
        </div>
      </div>
    </ViewerContainer>
  );
}; 
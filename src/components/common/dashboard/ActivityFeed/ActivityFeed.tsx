import React, { useState } from 'react';
import { Avatar } from '../../../common/Avatar';
import { Tag } from '../../../common/Tag';
import { Button } from '../../../common/Button';
import {
  FeedContainer,
  ActivityItem,
  ActivityContent,
  ActivityMeta,
  FilterSection,
} from './ActivityFeed.styles';

interface Activity {
  id: string;
  type: string;
  title: string;
  description?: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    status?: string;
    priority?: string;
    category?: string;
    [key: string]: any;
  };
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

interface ActivityFeedProps {
  activities: Activity[];
  filters?: {
    types?: string[];
    categories?: string[];
    users?: Array<{ id: string; name: string }>;
  };
  onFilterChange?: (filters: Record<string, string[]>) => void;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  filters,
  onFilterChange,
  onLoadMore,
  hasMore = false,
  isLoading,
}) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [type]: activeFilters[type]?.includes(value)
        ? activeFilters[type].filter((v) => v !== value)
        : [...(activeFilters[type] || []), value],
    };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}분 전`;
    }
    if (hours < 24) {
      return `${hours}시간 전`;
    }
    if (days < 7) {
      return `${days}일 전`;
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return '➕';
      case 'update':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'comment':
        return '💬';
      case 'complete':
        return '✅';
      default:
        return '📌';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <FeedContainer>
      {filters && (
        <FilterSection>
          {filters.types && (
            <div>
              <h4>활동 유형</h4>
              {filters.types.map((type) => (
                <Tag
                  key={type}
                  label={type}
                  onClick={() => handleFilterChange('type', type)}
                  selected={activeFilters.type?.includes(type)}
                />
              ))}
            </div>
          )}
          {filters.categories && (
            <div>
              <h4>카테고리</h4>
              {filters.categories.map((category) => (
                <Tag
                  key={category}
                  label={category}
                  onClick={() => handleFilterChange('category', category)}
                  selected={activeFilters.category?.includes(category)}
                />
              ))}
            </div>
          )}
          {filters.users && (
            <div>
              <h4>사용자</h4>
              {filters.users.map((user) => (
                <Tag
                  key={user.id}
                  label={user.name}
                  onClick={() => handleFilterChange('user', user.id)}
                  selected={activeFilters.user?.includes(user.id)}
                />
              ))}
            </div>
          )}
        </FilterSection>
      )}

      {activities.map((activity) => (
        <ActivityItem key={activity.id}>
          <span>{getActivityIcon(activity.type)}</span>
          <Avatar
            src={activity.user.avatar}
            name={activity.user.name}
            alt={activity.user.name}
            size="small"
          />
          <ActivityContent>
            <div>
              <strong>{activity.user.name}</strong>
              <span>{activity.title}</span>
            </div>
            {activity.description && <p>{activity.description}</p>}
            {activity.metadata && (
              <div>
                {activity.metadata.status && (
                  <Tag
                    label={activity.metadata.status}
                    color={getStatusColor(activity.metadata.status)}
                  />
                )}
                {activity.metadata.priority && (
                  <Tag label={`우선순위: ${activity.metadata.priority}`} />
                )}
                {activity.metadata.category && (
                  <Tag label={activity.metadata.category} />
                )}
              </div>
            )}
            {activity.actions && (
              <div>
                {activity.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="text"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </ActivityContent>
          <ActivityMeta>
            <time>{formatTimestamp(activity.timestamp)}</time>
          </ActivityMeta>
        </ActivityItem>
      ))}

      {hasMore && (
        <Button
          variant="outline"
          onClick={onLoadMore}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '로딩 중...' : '더 보기'}
        </Button>
      )}
    </FeedContainer>
  );
}; 
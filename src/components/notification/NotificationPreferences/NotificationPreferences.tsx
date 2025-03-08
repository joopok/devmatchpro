import React, { useState } from 'react';
import { Switch } from '../../Switch';
import { Button } from '../../Button';
import { Card } from '../../Card';
import { TimeSelect } from '../../DateTimeSelector';
import {
  PreferencesContainer,
  Section,
  ChannelGroup,
  TimeRangeGroup,
  CategoryGroup,
} from './NotificationPreferences.styles';

interface NotificationChannel {
  id: string;
  type: 'EMAIL' | 'PUSH' | 'SMS';
  enabled: boolean;
  frequency: 'IMMEDIATE' | 'DAILY' | 'WEEKLY';
  timeRange?: {
    start: string;
    end: string;
  };
}

interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  channels: string[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface NotificationPreferencesProps {
  channels: NotificationChannel[];
  categories: NotificationCategory[];
  onUpdateChannel: (channelId: string, updates: Partial<NotificationChannel>) => Promise<void>;
  onUpdateCategory: (categoryId: string, updates: Partial<NotificationCategory>) => Promise<void>;
  onSavePreferences: () => Promise<void>;
  isLoading?: boolean;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  channels,
  categories,
  onUpdateChannel,
  onUpdateCategory,
  onSavePreferences,
  isLoading,
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleChannelToggle = async (channelId: string, enabled: boolean) => {
    await onUpdateChannel(channelId, { enabled });
    setHasUnsavedChanges(true);
  };

  const handleFrequencyChange = async (channelId: string, frequency: NotificationChannel['frequency']) => {
    await onUpdateChannel(channelId, { frequency });
    setHasUnsavedChanges(true);
  };

  const handleTimeRangeChange = async (
    channelId: string,
    timeRange: { start: string; end: string }
  ) => {
    await onUpdateChannel(channelId, { timeRange });
    setHasUnsavedChanges(true);
  };

  const handleCategoryToggle = async (categoryId: string, enabled: boolean) => {
    await onUpdateCategory(categoryId, { enabled });
    setHasUnsavedChanges(true);
  };

  const handleChannelForCategoryToggle = async (
    categoryId: string,
    channelId: string,
    enabled: boolean
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const updatedChannels = enabled
      ? [...category.channels, channelId]
      : category.channels.filter((id) => id !== channelId);

    await onUpdateCategory(categoryId, { channels: updatedChannels });
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    await onSavePreferences();
    setHasUnsavedChanges(false);
  };

  const getChannelLabel = (type: NotificationChannel['type']) => {
    switch (type) {
      case 'EMAIL':
        return '이메일';
      case 'PUSH':
        return '푸시 알림';
      case 'SMS':
        return 'SMS';
    }
  };

  return (
    <PreferencesContainer>
      <h2>알림 설정</h2>

      <Section>
        <h3>알림 채널</h3>
        <Card>
          {channels.map((channel) => (
            <ChannelGroup key={channel.id}>
              <div>
                <h4>{getChannelLabel(channel.type)}</h4>
                <Switch
                  checked={channel.enabled}
                  onChange={(checked) => handleChannelToggle(channel.id, checked)}
                  disabled={isLoading}
                />
              </div>

              {channel.enabled && (
                <>
                  <div>
                    <label>수신 빈도</label>
                    <select
                      value={channel.frequency}
                      onChange={(e) =>
                        handleFrequencyChange(
                          channel.id,
                          e.target.value as NotificationChannel['frequency']
                        )
                      }
                      disabled={isLoading}
                    >
                      <option value="IMMEDIATE">실시간</option>
                      <option value="DAILY">일간 요약</option>
                      <option value="WEEKLY">주간 요약</option>
                    </select>
                  </div>

                  {channel.type !== 'PUSH' && (
                    <TimeRangeGroup>
                      <label>수신 시간</label>
                      <TimeSelect
                        start={channel.timeRange?.start || '09:00'}
                        end={channel.timeRange?.end || '18:00'}
                        onChange={async (range) => {
                          if (typeof range === 'object' && range !== null && 'start' in range) {
                            await handleTimeRangeChange(channel.id, range as { start: string; end: string });
                          }
                        }}
                        disabled={isLoading}
                      />
                    </TimeRangeGroup>
                  )}
                </>
              )}
            </ChannelGroup>
          ))}
        </Card>
      </Section>

      <Section>
        <h3>알림 카테고리</h3>
        {categories.map((category) => (
          <CategoryGroup key={category.id}>
            <Card>
              <div>
                <h4>{category.name}</h4>
                <p>{category.description}</p>
                <Switch
                  checked={category.enabled}
                  onChange={(checked) =>
                    handleCategoryToggle(category.id, checked)
                  }
                  disabled={isLoading}
                />
              </div>

              {category.enabled && (
                <div>
                  <h5>알림 채널 선택</h5>
                  {channels.map((channel) => (
                    <Switch
                      key={channel.id}
                      label={getChannelLabel(channel.type)}
                      checked={category.channels.includes(channel.id)}
                      onChange={(checked) =>
                        handleChannelForCategoryToggle(
                          category.id,
                          channel.id,
                          checked
                        )
                      }
                      disabled={isLoading || !channel.enabled}
                    />
                  ))}
                </div>
              )}
            </Card>
          </CategoryGroup>
        ))}
      </Section>

      <Button
        onClick={handleSave}
        disabled={isLoading || !hasUnsavedChanges}
        fullWidth
      >
        {isLoading ? '저장 중...' : '설정 저장'}
      </Button>
    </PreferencesContainer>
  );
}; 
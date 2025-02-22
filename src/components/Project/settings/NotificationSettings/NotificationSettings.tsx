import React from 'react';
import { Switch } from '../../../common/Switch';
import {
  SettingsContainer,
  Section,
  SectionTitle,
  SettingItem,
  SettingLabel,
  Description,
} from './NotificationSettings.styles';

interface NotificationPreferences {
  email: {
    projectUpdates: boolean;
    messages: boolean;
    marketing: boolean;
  };
  push: {
    projectUpdates: boolean;
    messages: boolean;
    marketing: boolean;
  };
}

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdate: (key: string, value: boolean) => void;
  isLoading?: boolean;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onUpdate,
  isLoading = false,
}) => {
  return (
    <SettingsContainer>
      <Section>
        <SectionTitle>이메일 알림</SectionTitle>
        <SettingItem>
          <SettingLabel>
            프로젝트 업데이트
            <Description>
              프로젝트 상태 변경, 마일스톤 완료 등의 알림
            </Description>
          </SettingLabel>
          <Switch
            checked={preferences.email.projectUpdates}
            onChange={(checked: boolean) => onUpdate('email.projectUpdates', checked)}
            disabled={isLoading}
          />
        </SettingItem>

        <SettingItem>
          <SettingLabel>
            메시지
            <Description>
              새로운 메시지 수신 알림
            </Description>
          </SettingLabel>
          <Switch
            checked={preferences.email.messages}
            onChange={(checked: boolean) => onUpdate('email.messages', checked)}
            disabled={isLoading}
          />
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>푸시 알림</SectionTitle>
        <SettingItem>
          <SettingLabel>
            프로젝트 업데이트
            <Description>
              프로젝트 관련 실시간 알림
            </Description>
          </SettingLabel>
          <Switch
            checked={preferences.push.projectUpdates}
            onChange={(checked: boolean) => onUpdate('push.projectUpdates', checked)}
            disabled={isLoading}
          />
        </SettingItem>

        <SettingItem>
          <SettingLabel>
            메시지
            <Description>
              실시간 메시지 알림
            </Description>
          </SettingLabel>
          <Switch
            checked={preferences.push.messages}
            onChange={(checked: boolean) => onUpdate('push.messages', checked)}
            disabled={isLoading}
          />
        </SettingItem>
      </Section>
    </SettingsContainer>
  );
}; 
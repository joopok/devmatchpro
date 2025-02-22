import React from 'react';
import { Tabs } from '../../../common/Tabs';

// 임시 컴포넌트들
const ProfileSettings = () => <div>Profile Settings</div>;
const NotificationSettings = () => <div>Notification Settings</div>;
const SecuritySettings = () => <div>Security Settings</div>;

export const UserSettings: React.FC = () => {
  return (
    <Tabs
      tabs={[
        {
          id: 'profile',
          label: '프로필',
          content: <ProfileSettings />,
        },
        {
          id: 'notifications',
          label: '알림',
          content: <NotificationSettings />,
        },
        {
          id: 'security',
          label: '보안',
          content: <SecuritySettings />,
        },
      ]}
      variant="contained"  // "pills" 대신 "contained" 사용
    />
  );
}; 
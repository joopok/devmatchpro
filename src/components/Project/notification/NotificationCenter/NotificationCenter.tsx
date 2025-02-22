import React from 'react';
import { NotificationList } from '../NotificationList/NotificationList';
import { useNotifications } from '../../../../hooks/useNotifications';
import {
  CenterContainer,
  Header,
  Title,
  CloseButton,
  Content,
} from './NotificationCenter.styles';
import { Notification } from '../../../../types/notification';
interface NotificationCenterProps {
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  onClose,
}) => {
  const { notifications, markAsRead } = useNotifications();

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  return (
    <CenterContainer>
      <Header>
        <Title>알림</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>
      <Content>
        <NotificationList
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />
      </Content>
    </CenterContainer>
  );
}; 
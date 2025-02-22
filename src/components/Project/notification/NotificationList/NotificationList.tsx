import React from 'react';
import { Avatar } from '../../../common/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Notification, NotificationType } from '../../../../types/notification';
import {
  ListContainer,
  NotificationItem,
  Content,
  Title,
  Message,
  Time,
} from './NotificationList.styles';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'PROJECT_UPDATE':
      return 'ℹ️';
    case 'PROJECT_CREATED':
      return '🆕';
    case 'PROJECT_COMPLETED':
      return '✅';
    case 'PROJECT_CANCELLED':
      return '❌';
    case 'APPLICATION_RECEIVED':
      return '📝';
    case 'APPLICATION_ACCEPTED':
      return '🎉';
    case 'APPLICATION_REJECTED':
      return '😢';
    case 'PAYMENT_RECEIVED':
      return '💰';
    case 'MILESTONE_COMPLETED':
      return '🏆';
    default:
      return '📢';
  }
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick,
}) => {
  if (!notifications?.length) {
    return (
      <ListContainer>
        <NotificationItem empty>
          <Message>새로운 알림이 없습니다</Message>
        </NotificationItem>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          isRead={notification.isRead}
          onClick={() => onNotificationClick?.(notification)}
        >
          <div>{getNotificationIcon(notification.type)}</div>
          <Content>
            <Title>{notification.title}</Title>
            <Message>{notification.message}</Message>
            <Time>
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </Time>
          </Content>
        </NotificationItem>
      ))}
    </ListContainer>
  );
};
import { useState, useEffect, useCallback } from 'react';
import { Notification } from '../types/notification';
import { notificationApi } from '../services/api/notification';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await notificationApi.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알림을 불러오는 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '알림 상태를 변경하는 중 오류가 발생했습니다');
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    refetch: fetchNotifications,
  };
}; 
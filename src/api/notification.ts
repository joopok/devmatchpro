import { api } from './axios';
import { Notification } from '../types/notification';

export const notificationApi = {
  getNotifications: () => 
    api.get<Notification[]>('/notifications'),
  
  markAsRead: (id: string) =>
    api.put(`/notifications/${id}/read`),
    
  deleteNotification: (id: string) =>
    api.delete(`/notifications/${id}`)
}; 
import { BaseEntity } from './common';

export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  metadata?: Record<string, any>;
}

export type NotificationType = 
  | 'PROJECT_UPDATE'
  | 'PROJECT_CREATED'
  | 'PROJECT_COMPLETED'
  | 'PROJECT_CANCELLED'
  | 'APPLICATION_RECEIVED'
  | 'APPLICATION_ACCEPTED'
  | 'APPLICATION_REJECTED'
  | 'PAYMENT_RECEIVED'
  | 'MILESTONE_COMPLETED'
  | 'TASK_ASSIGNED'
  | 'MESSAGE_RECEIVED'
  | 'SYSTEM';

export interface NotificationPreferences {
  email: {
    projectUpdates: boolean;
    messages: boolean;
    taskAssignments: boolean;
    milestoneUpdates: boolean;
  };
  push: {
    enabled: boolean;
    projectUpdates: boolean;
    messages: boolean;
    taskAssignments: boolean;
  };
} 
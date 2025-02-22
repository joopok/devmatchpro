export type ActionType = 'create' | 'read' | 'update' | 'delete' | 'manage';

export interface Permission {
  resource: string;
  action: ActionType;
  scope: 'all' | 'own';
} 
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
} 
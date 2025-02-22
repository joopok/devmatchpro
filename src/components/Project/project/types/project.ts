 export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  managerId: string;
  isNew?: boolean;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  progress?: number;
}

export type CreateProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectInput = Partial<Project>;
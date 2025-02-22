import { BaseEntity, Priority, Status } from './common';
import { UserProfile } from './user';

export type WorkType = 'REMOTE' | 'ONSITE' | 'HYBRID';
export type ProjectStatus = 'OPEN' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Budget {
  min: number;
  max: number;
  currency: string;
}

export interface Project extends BaseEntity {
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: string;
  endDate?: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  workType: WorkType;
  location?: string;
  requiredSkills: string[];
  duration: {
    start: string;
    end?: string;
  };
  tags: string[];
  teamSize?: number;
  owner?: UserProfile;
  team?: UserProfile[];
  progress?: number;
  category?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  status: ProjectStatus;
  budget: Budget;
  requiredSkills: string[];
  workType: WorkType;
  duration: {
    start: string;
    end?: string;
  };
  location?: string;
  teamSize?: number;
  priority: Priority;
  files?: File[];
}

export interface ProjectFilters {
  status?: ProjectStatus[];
  workType?: WorkType[];
  skills?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
  searchQuery?: string;
}

export interface ProjectSortOptions {
  field: keyof Project;
  direction: 'asc' | 'desc';
}

export interface ProjectQueryOptions {
  filters?: ProjectFilters;
  sort?: ProjectSortOptions;
  page?: number;
  limit?: number;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  developerId: string;
  status: ApplicationStatus;
  proposal: string;
  expectedDuration: string;
  proposedBudget: number;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone extends BaseEntity {
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  progress: number;
}

export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  performanceMetrics: {
    onTimeDelivery: number;
    clientSatisfaction: number;
  };
  categoryDistribution: Array<{
    category: string;
    count: number;
  }>;
}

export type { Priority }; 
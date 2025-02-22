export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  workType: WorkType;
  requiredSkills: string[];
  teamSize?: number;
  priority: Priority;
  duration: {
    start: string;
    end?: string;
  };
  location?: string;
}

export type ProjectStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OPEN';
export type WorkType = 'REMOTE' | 'ONSITE' | 'HYBRID';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'; 
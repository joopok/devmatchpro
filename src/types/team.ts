export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  avatar?: string;
  joinedAt: string;
}

export interface TeamProject {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  deadline: string;
  progress: number;
  members: TeamMember[];
}

export interface Activity {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'PROJECT' | 'TASK' | 'COMMENT' | 'OTHER';
  content: string;
  project?: {
    id: string;
    title: string;
  };
  timestamp: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  projects: TeamProject[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
} 
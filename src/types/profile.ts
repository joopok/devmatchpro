export type ProfileRole = 'DEVELOPER' | 'CLIENT';

export interface BaseProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: ProfileRole;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  role: string;
  url?: string;
}

export interface DeveloperProfile extends BaseProfile {
  role: 'DEVELOPER';
  skills: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  experience: number;
  portfolio: Project[];
}

export interface ClientProfile extends BaseProfile {
  role: 'CLIENT';
  companyName?: string;
  industry?: string;
}

export type Profile = DeveloperProfile | ClientProfile;

export interface ProfileFormData {
  name: string;
  bio: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills?: string[];
  experience?: number;
  companyName?: string;
  industry?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  role: ProfileRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
} 
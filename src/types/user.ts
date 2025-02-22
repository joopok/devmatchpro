import { BaseEntity, Role } from './common';

export interface UserProfile extends BaseEntity {
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  bio?: string;
  skills?: string[];
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: Role;
  acceptTerms: boolean;
}

export type UserRole = 'ADMIN' | 'DEVELOPER' | 'CLIENT';
export enum WorkType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
  REMOTE = 'REMOTE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'DEVELOPER' | 'CLIENT';
  bio?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface DeveloperProfile extends User {
  role: 'DEVELOPER';
  title: string;
  skills: string[];
  experience: number;
  experiences: Experience[];
  preferredWorkType: WorkType[];
  rating?: number;
  reviewCount?: number;
  completedProjects: number;
  successRate: number;
  averageResponseTime: string;
  portfolio?: string;
  linkedinUrl?: string;
  company?: string;
  position?: string;
}

export interface ClientProfile extends User {
  role: 'CLIENT';
  company: string;
  position: string;
  title?: string;
}

export interface ProfileEditorData {
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
  skills: string[];
  experience: number;
  preferredWorkType: WorkType[];
  experiences: Experience[];
  portfolio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  company?: string;
  position?: string;
}

export const isDeveloperProfile = (profile: DeveloperProfile | ClientProfile): profile is DeveloperProfile => {
  return profile.role === 'DEVELOPER';
};

export const isClientProfile = (profile: DeveloperProfile | ClientProfile): profile is ClientProfile => {
  return profile.role === 'CLIENT';
};

// 인증용 User 타입 (password 포함)
export interface AuthUser extends User {
  password: string;
}
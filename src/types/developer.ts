// types/developer.ts
import { WorkType } from './project';

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

export interface Evaluation {
  id: string;
  rating: number;
  comment: string;
  projectId: string;
  clientId: string;
  createdAt: string;
}

export interface Developer {
  id: string;
  name: string;
  skills: Skill[];
  experience: number;
  availableFrom: Date;
  preferredLocation: string[];
  ratePerHour: number;
  projects: string[]; // Project IDs
  certifications: Certification[];
  evaluations: Evaluation[];
}
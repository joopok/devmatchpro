import { Project } from '../entities/Project';

export interface IProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project>;
  createProject(project: Omit<Project, 'id'>): Promise<Project>;
  updateProject(id: string, project: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
} 
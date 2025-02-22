import { api } from './axios'; // 실제 API 클라이언트

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  teamId: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateProjectDto {
  title: string;
  description: string;
  teamId: string;
  managerId: string;
}

interface UpdateProjectDto {
  title?: string;
  description?: string;
  status?: Project['status'];
  teamId?: string;
  managerId?: string;
}

export const projectApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: CreateProjectDto) => api.post<Project>('/projects', data),
  update: (id: string, data: UpdateProjectDto) =>  api.patch<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  getByTeam: (teamId: string) => api.get<Project[]>(`/teams/${teamId}/projects`),
  getProjects: async () => {
    // API 구현
    return [];
  }
}; 
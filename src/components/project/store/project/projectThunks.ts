import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project, CreateProjectInput, UpdateProjectInput } from '../../types/project';
import { api } from '../../../../services/api/axios';

export const createProject = createAsyncThunk(
  'project/create',
  async (input: CreateProjectInput) => {
    const { data } = await api.post<Project>('/projects', input);
    return data;
  }
);

export const updateProject = createAsyncThunk(
  'project/update',
  async ({ id, data }: { id: string; data: UpdateProjectInput }) => {
    const response = await api.patch<Project>(`/projects/${id}`, data);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'project/delete',
  async (id: string) => {
    await api.delete(`/projects/${id}`);
    return id;
  }
);

export const fetchProjects = createAsyncThunk(
  'project/fetchAll',
  async () => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  }
); 
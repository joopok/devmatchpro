import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../../types/project';

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async () => {
    // TODO: API 호출 구현
    const response = await fetch('/api/projects');
    const data = await response.json();
    return data as Project[];
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId: string) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });
    return projectId;
  }
); 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types/project';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // deleteProject 사용하지 않는 경우 제거
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setProjects, setLoading, setError } = projectSlice.actions;
export default projectSlice.reducer; 
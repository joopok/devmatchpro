import { IProjectRepository } from '../../core/domain/repositories/IProjectRepository';
import { Project } from '../../core/domain/entities/Project';
import { supabase } from '../config/supabase';

export class ProjectRepository implements IProjectRepository {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_deleted', false);

    if (error) throw new Error(error.message);
    return data;
  }

  async getProject(id: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update({ is_deleted: true })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
} 
import { Project } from '../../../domain/entities/Project';
import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';

export class GetProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.getProjects();
  }
} 
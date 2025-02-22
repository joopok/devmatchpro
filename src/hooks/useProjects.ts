import { useQuery } from '@tanstack/react-query';
import { projectRepository } from '../infrastructure/repositories';
import { GetProjectsUseCase } from '../core/application/useCases/project/GetProjectsUseCase';

export const useProjects = () => {
  const getProjectsUseCase = new GetProjectsUseCase(projectRepository);

  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjectsUseCase.execute(),
  });
}; 
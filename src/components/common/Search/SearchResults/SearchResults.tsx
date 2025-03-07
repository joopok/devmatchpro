import React from 'react';
import { Button } from '../../Button';
import { ProjectCard } from '../../project/ProjectCard/ProjectCard';
import { DeveloperCard } from '../../developer/DeveloperCard/DeveloperCard';
import {
  ResultsContainer,
  ResultsHeader,
  ResultsGrid,
  NoResults,
  LoadMore,
} from './SearchResults.styles';
import { Project } from '../../../../types/project';
import { DeveloperProfile } from '../../../../types/user';

interface SearchResultsProps {
  results: Array<Project | DeveloperProfile>;
  totalCount: number;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  totalCount,
  isLoading,
  hasMore,
  onLoadMore,
}) => {
  if (results.length === 0) {
    return (
      <NoResults>
        검색 결과가 없습니다.
      </NoResults>
    );
  }

  return (
    <ResultsContainer>
      <ResultsHeader>
        <h2>검색 결과 ({totalCount})</h2>
      </ResultsHeader>
      
      <ResultsGrid>
        {results.map((item) => (
          'role' in item ? (
            <DeveloperCard key={item.id} developer={item as DeveloperProfile} />
          ) : (
            <ProjectCard key={item.id} project={item as Project} />
          )
        ))}
      </ResultsGrid>

      {hasMore && (
        <LoadMore>
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? '로딩 중...' : '더 보기'}
          </Button>
        </LoadMore>
      )}
    </ResultsContainer>
  );
}; 
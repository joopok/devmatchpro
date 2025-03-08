import React, { useState } from 'react';
import { Button } from '../../Button';
import { Tag } from '../../Tag';
import {
  IssuesContainer,
  IssuesList,
  IssueItem,
  IssueHeader,
  IssueContent,
  FilterSection,
} from './ProjectIssues.styles';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigneeId: string;
  createdAt: string;
}

interface ProjectIssuesProps {
  projectId: string;
}

export const ProjectIssues: React.FC<ProjectIssuesProps> = ({ projectId }) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  React.useEffect(() => {
    // TODO: Fetch issues for the project
    const fetchIssues = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/issues`);
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      }
    };

    fetchIssues();
  }, [projectId]);

  return (
    <IssuesContainer>
      <div>
        <h2>이슈 관리</h2>
        <Button>
          + 새 이슈 추가
        </Button>
      </div>

      <FilterSection>
        <select>
          <option value="all">모든 상태</option>
          <option value="OPEN">미해결</option>
          <option value="IN_PROGRESS">진행중</option>
          <option value="RESOLVED">해결됨</option>
          <option value="CLOSED">종료</option>
        </select>
      </FilterSection>

      <IssuesList>
        {issues.map((issue) => (
          <IssueItem key={issue.id}>
            <IssueHeader>
              <h3>{issue.title}</h3>
              <div>
                <Tag
                  label={issue.status}
                  color={
                    issue.status === 'OPEN' ? 'error' :
                    issue.status === 'IN_PROGRESS' ? 'warning' :
                    issue.status === 'RESOLVED' ? 'success' :
                    'default'
                  }
                />
                <Tag
                  label={issue.priority}
                  color={
                    issue.priority === 'HIGH' ? 'error' :
                    issue.priority === 'MEDIUM' ? 'warning' :
                    'default'
                  }
                />
              </div>
            </IssueHeader>
            <IssueContent>
              <p>{issue.description}</p>
            </IssueContent>
          </IssueItem>
        ))}
      </IssuesList>
    </IssuesContainer>
  );
}; 
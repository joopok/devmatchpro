import styled from '@emotion/styled';
import { Card } from '../../../common/Card';

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  h1 {
    margin: 0 0 8px;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

export const StatCard = styled(Card)`
  padding: 16px;
  text-align: center;

  h3 {
    margin: 0 0 8px;
    font-size: 1rem;
    color: #666;
  }

  strong {
    font-size: 1.5rem;
    color: #333;
  }
`;

export const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

export const MemberInfo = styled.div`
  h3 {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

export const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProjectItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #f8f9fa;

  div:last-child {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 0.9rem;
    color: #666;
  }
`;

export const ProjectInfo = styled.div`
  h3 {
    margin: 0 0 4px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

export const ActivitySection = styled.section`
  margin-top: 32px;

  h3 {
    margin: 0 0 16px;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  small {
    color: #666;
  }
`;

export const ProjectsSection = styled.section`
  margin-bottom: 32px;
`;

export const MembersSection = styled.section`
  margin-bottom: 32px;
`;

export const ProjectCard = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const MemberCard = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatsSection = styled.section`
  margin-bottom: 32px;
  
  h2 {
    margin: 0 0 16px;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
`; 
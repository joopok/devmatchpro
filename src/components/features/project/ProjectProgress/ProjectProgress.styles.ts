import styled from 'styled-components';

export const ProgressContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    margin: 0;
  }
`;

export const StatusSection = styled.div`
  margin-bottom: 24px;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

export const StatItem = styled.div`
  text-align: center;
  
  h4 {
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const MilestoneSection = styled.div`
  margin-top: 24px;
  
  h3 {
    margin: 0 0 16px 0;
  }
`;

export const MilestoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MilestoneItem = styled.div<{ status: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border-left: 4px solid ${({ theme, status }) => theme.colors[status.toLowerCase()]};
  
  h4 {
    margin: 0 0 8px 0;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const TimelineSection = styled.div`
  margin: 24px 0;
  
  h4 {
    margin: 0 0 8px 0;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`; 
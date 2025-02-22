import styled from 'styled-components';

export const FeedContainer = styled.div`
  padding: 20px;
`;

export const FilterSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 24px;
  
  > div {
    h4 {
      margin-bottom: 8px;
    }
    
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityContent = styled.div`
  flex: 1;
  
  > div {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;
  }
`;

export const ActivityMeta = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`; 
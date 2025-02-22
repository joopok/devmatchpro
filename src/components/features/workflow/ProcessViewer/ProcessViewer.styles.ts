import styled from 'styled-components';

export const ViewerContainer = styled.div`
  padding: 24px;
`;

export const ProcessHeader = styled.div`
  margin-bottom: 24px;
  
  h2 {
    margin-bottom: 8px;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 16px;
  }
`;

export const StageDetails = styled.div`
  margin-top: 24px;
`;

export const ActivityLog = styled.div`
  margin-top: 24px;
  
  > div {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const ParticipantList = styled.div`
  margin-bottom: 24px;
  
  > div {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
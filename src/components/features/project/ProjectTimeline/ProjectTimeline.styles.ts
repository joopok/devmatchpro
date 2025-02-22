import styled from '@emotion/styled';

export const TimelineContainer = styled.div`
  padding: 24px;
`;

export const TimelineHeader = styled.div`
  margin-bottom: 24px;
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimelineItem = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
`;

export const ItemContent = styled.div`
  margin: 8px 0;
`;

export const ItemDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const ItemStatus = styled.span<{ status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'COMPLETED':
        return '#d4edda';
      case 'IN_PROGRESS':
        return '#fff3cd';
      default:
        return '#f8f9fa';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'COMPLETED':
        return '#155724';
      case 'IN_PROGRESS':
        return '#856404';
      default:
        return '#383d41';
    }
  }};
`;

export const ProgressBar = styled.div<{ progress: number; status: string }>`
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  margin: 8px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: ${({ status }) => 
      status === 'COMPLETED' ? '#28a745' : 
      status === 'IN_PROGRESS' ? '#ffc107' : '#6c757d'
    };
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`; 
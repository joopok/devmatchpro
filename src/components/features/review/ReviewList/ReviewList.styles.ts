import styled from '@emotion/styled';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReviewItem = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const UserInfo = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const Name = styled.h4`
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 500;
`;

export const Time = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

export const ProjectInfo = styled.div`
  margin-bottom: 12px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
`;

export const Content = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
`; 
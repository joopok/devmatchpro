import styled from '@emotion/styled';

export const ResultsContainer = styled.div`
  padding: 24px;
`;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 48px;
  color: #666;
`;

export const LoadMore = styled.div`
  text-align: center;
  margin-top: 32px;
`; 
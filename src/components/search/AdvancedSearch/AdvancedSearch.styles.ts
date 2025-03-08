import styled from '@emotion/styled';

export const SearchContainer = styled.div`
  padding: 24px;
`;

export const SearchHeader = styled.div`
  margin-bottom: 24px;
`;

export const FilterSection = styled.div`
  margin-bottom: 24px;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

export const SearchActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`; 
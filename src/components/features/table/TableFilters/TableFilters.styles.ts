import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  
  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    label {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const ActiveFilters = styled.div`
  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    h4 {
      margin: 0;
      font-size: 14px;
    }
  }
  
  > div:last-child {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const SavedFilters = styled.div`
  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
  }
  
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    > div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`; 
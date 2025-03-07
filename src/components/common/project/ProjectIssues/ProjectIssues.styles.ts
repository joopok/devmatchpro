import styled from 'styled-components';

export const IssuesContainer = styled.div`
  padding: 24px;
`;

export const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export const IssueItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const IssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  > div {
    display: flex;
    gap: 8px;
  }
`;

export const IssueContent = styled.div`
  margin-bottom: 16px;
  
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }
`;

export const IssueFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 16px;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
`;

export const AddIssueForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  select {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const styles = {
  IssuesContainer,
  IssuesList,
  IssueItem,
  IssueHeader,
  IssueContent,
  IssueFooter,
  AddIssueForm,
  FilterSection,
};

export default styles;
import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 24px;
`;

export const FormTitle = styled.h2`
  margin-bottom: 24px;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MilestoneList = styled.div`
  margin-top: 16px;
`;

export const MilestoneItem = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  margin-bottom: 16px;
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: transparent;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
`; 
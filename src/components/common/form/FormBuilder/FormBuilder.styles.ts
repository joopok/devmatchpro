import styled from 'styled-components';

export const StyledBuilderContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

export const FieldPalette = styled.div`
  width: 200px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const FormPreview = styled.div`
  flex: 1;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const FieldEditor = styled.div`
  width: 300px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const ToolbarSection = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const StyledFieldsContainer = styled.div`
  flex: 1;
  min-height: 200px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

export const StyledFormField = styled.div<{ isDragging?: boolean }>`
  background: white;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: ${({ isDragging }) => 
    isDragging ? '0 5px 10px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)'};
`; 
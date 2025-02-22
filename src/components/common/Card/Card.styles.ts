import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardTitle = styled.h3`
  margin: 0;
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`; 
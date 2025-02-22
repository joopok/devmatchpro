import styled from 'styled-components';

export const ConfirmMessage = styled.p`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  line-height: 1.5;
`;

export const WarningText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ProjectTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`; 
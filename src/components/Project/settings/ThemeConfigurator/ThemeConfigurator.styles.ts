import styled from 'styled-components';

export const ConfiguratorContainer = styled.div`
  padding: 24px;
`;

export const ColorSection = styled.section`
  margin-bottom: 32px;
`;

export const TypographySection = styled.section`
  margin-bottom: 32px;
`;

export const SpacingSection = styled.section`
  margin-bottom: 32px;
`;

export const PreviewSection = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`; 
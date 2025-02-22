import styled from 'styled-components';

export const SettingsContainer = styled.div`
  padding: 24px;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 16px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SettingLabel = styled.label`
  font-weight: 500;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-top: 4px;
`; 
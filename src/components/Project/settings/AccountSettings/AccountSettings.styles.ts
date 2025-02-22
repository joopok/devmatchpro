import styled from '@emotion/styled';

export const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const Section = styled.section`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

export const SecuritySettings = styled.div`
  h4 {
    margin: 0 0 8px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  p {
    margin: 0 0 16px;
    color: #666;
    font-size: 0.9rem;
  }
`;

export const NotificationPreferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DeleteAccount = styled.div`
  h4 {
    margin: 0 0 8px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #dc3545;
  }

  p {
    margin: 0 0 16px;
    color: #666;
    font-size: 0.9rem;
  }

  button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`; 
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
`;

export const AvatarSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

export const SkillsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SkillInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SkillChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    background-color: #e9ecef;
    border-radius: 16px;
    font-size: 0.9rem;
    color: #495057;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #dee2e6;
    }
  }
`; 
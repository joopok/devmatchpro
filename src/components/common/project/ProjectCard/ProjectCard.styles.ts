import styled from 'styled-components';

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

export const SkillTag = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 12px;
`;

export const Budget = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-top: 8px;
`;

export const WorkType = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-top: 4px;
`;

export const Card = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 12px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`; 
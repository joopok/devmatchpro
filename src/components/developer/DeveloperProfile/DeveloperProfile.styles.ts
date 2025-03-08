import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Info = styled.div`
  flex: 1;
`;

export const Name = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Role = styled.p`
  margin: 4px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Stats = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const StatItem = styled.div`
  text-align: center;

  h3 {
    margin: 0;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Section = styled.section`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const ProjectCard = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 8px 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`; 
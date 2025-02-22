import styled from 'styled-components';

export const DetailContainer = styled.div`
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

export const Status = styled.div`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

export const Content = styled.div`
  display: grid;
  gap: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const BudgetInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`; 
import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

export const TeamCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const TeamImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const TeamInfo = styled.div`
  padding: 16px;
`;

export const TeamName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const TeamDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 16px;
`;

export const TeamStats = styled.div`
  display: flex;
  gap: 16px;
`;

export const Stat = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 
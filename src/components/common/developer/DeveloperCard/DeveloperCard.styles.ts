import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Info = styled.div`
  margin-left: 16px;
`;

export const Name = styled.h3`
  margin: 0 0 4px;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Title = styled.p`
  margin: 0 0 8px;
  color: #666;
  font-size: 0.9rem;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

export const StatItem = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 4px;
  }

  strong {
    font-size: 1rem;
    color: #333;
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  margin-top: auto;
  text-align: center;

  button {
    width: 100%;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    margin: 0.5rem 0 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoginButton = styled(Button)`
  margin-top: 1rem;
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
  background: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const LoginFooter = styled.div`
  margin-top: 2rem;
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

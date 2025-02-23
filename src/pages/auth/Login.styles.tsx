import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const LoginBackground = styled.div`
  background-image: url('/assets/img/photos/unsplash-1.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  }
`;

export const TestimonialContent = styled.div`
  position: relative;
  color: white;
  max-width: 500px;
  margin-bottom: 2rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  .author {
    font-size: 1rem;
    opacity: 0.7;
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
  background: ${props => props.theme.colors.background};

  > * {
    width: 100%;
    max-width: 420px;
  }
`;

export const LoginLogo = styled.img`
  height: 32px;
  margin-bottom: 2rem;
  align-self: center;
`;

export const LoginDescription = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const LoginCard = styled.div`
  width: 100%;
`;

export const LoginFormWrapper = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LoginButton = styled(Button)<{ $fullWidth?: boolean }>`
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
  background: ${props => props.theme.colors.primary};
  color: white;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  border-radius: 6px;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: ${props => props.theme.colors.textSecondary};
    
    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
`;

export const LoginFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SocialButton = styled(Button)<{ $provider: 'facebook' | 'google' | 'apple' }>`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  
  ${props => {
    switch (props.$provider) {
      case 'facebook':
        return `
          background: #1877F2;
          color: white;
          &:hover { background: #0C63D4; }
        `;
      case 'google':
        return `
          background: white;
          color: #333;
          border: 1px solid #ddd;
          &:hover { background: #f8f9fa; }
        `;
      case 'apple':
        return `
          background: black;
          color: white;
          &:hover { background: #1a1a1a; }
        `;
    }
  }}
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }
  
  span {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
`;

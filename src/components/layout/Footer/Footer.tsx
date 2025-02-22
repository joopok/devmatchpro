import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div className="container mx-auto">
        <p>© 2024 DevMatch Pro. All rights reserved.</p>
      </div>
    </FooterContainer>
  );
}; 
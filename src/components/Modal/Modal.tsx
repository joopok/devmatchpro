import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
}) => {
  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <Container onClick={e => e.stopPropagation()} $size={size}>
        {title && <Header>{title}</Header>}
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </Container>
    </Overlay>,
    document.body
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Container = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: ${({ $size }) => {
    switch ($size) {
      case 'small': return '400px';
      case 'large': return '800px';
      default: return '600px';
    }
  }};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 18px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 24px;
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`; 
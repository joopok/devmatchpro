import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
  status?: 'online' | 'offline' | 'away';
  alt?: string;
  className?: string;
  onClick?: () => void;
}

const AvatarContainer = styled.div<{ $size: string }>`
  position: relative;
  width: ${({ $size }) => 
    $size === 'small' ? '32px' : 
    $size === 'large' ? '64px' : '48px'};
  height: ${({ $size }) => 
    $size === 'small' ? '32px' : 
    $size === 'large' ? '64px' : '48px'};
`;

const StatusIndicator = styled.div<{ $status?: string }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ $status, theme }) => 
    $status === 'online' ? theme.colors.success :
    $status === 'away' ? theme.colors.warning :
    theme.colors.textSecondary};
`;

const Image = styled.img<{ $size: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Fallback = styled.div<{ $size: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => 
    $size === 'small' ? '12px' : 
    $size === 'large' ? '24px' : '18px'};
`;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'medium',
  status,
  alt,
  className,
  onClick,
}) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <AvatarContainer $size={size} className={className} onClick={onClick}>
      {src ? (
        <Image src={src} alt={alt || name} $size={size} />
      ) : (
        <Fallback $size={size}>{initials}</Fallback>
      )}
      {status && <StatusIndicator $status={status} />}
    </AvatarContainer>
  );
}; 
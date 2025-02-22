import React from 'react';
import styled from 'styled-components';

export interface TagProps {
  label: string;
  variant?: 'filled' | 'outline';
  size?: 'small' | 'medium' | 'large';
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  onDelete?: () => void;
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'filled',
  size = 'medium',
  selected = false,
  onClick,
  onRemove,
  onDelete,
  color = 'default',
}) => {
  return (
    <TagContainer
      $variant={variant}
      $size={size}
      $selected={selected}
      $color={color}
      onClick={onClick}
      $clickable={!!onClick}
    >
      {label}
    </TagContainer>
  );
};

const TagContainer = styled.span<{
  $variant: 'filled' | 'outline';
  $size: 'small' | 'medium' | 'large';
  $selected: boolean;
  $clickable: boolean;
  $color: 'default' | 'success' | 'warning' | 'error' | 'info';
}>`
  display: inline-flex;
  align-items: center;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '2px 8px';
      case 'large':
        return '8px 16px';
      default:
        return '4px 12px';
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '12px';
      case 'large':
        return '16px';
      default:
        return '14px';
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme, $variant, $selected, $color }) =>
    $variant === 'filled'
      ? $selected
        ? theme.colors.primary
        : $color === 'success'
        ? theme.colors.successLight
        : $color === 'error'
        ? theme.colors.errorLight
        : $color === 'warning'
        ? theme.colors.warningLight
        : theme.colors.backgroundAlt
      : 'transparent'};
  border: 1px solid
    ${({ theme, $variant, $selected }) =>
      $variant === 'outline'
        ? $selected
          ? theme.colors.primary
          : theme.colors.border
        : 'transparent'};
  color: ${({ theme, $color }) =>
    $color === 'success'
      ? theme.colors.success
      : $color === 'error'
      ? theme.colors.error
      : $color === 'warning'
      ? theme.colors.warning
      : theme.colors.text};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: all 0.2s;

  &:hover {
    ${({ $clickable, theme }) =>
      $clickable &&
      `
      background-color: ${theme.colors.backgroundAlt};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    `}
  }
`; 
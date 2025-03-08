import React from 'react';
import { ButtonProps, StyledButton } from './Button.styles'; 
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { IconWrapper } from '../IconWrapper/IconWrapper';


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'medium', 
    fullWidth = false, 
    className, 
    children, 
    loading, 
    icon, 
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const iconOnly = !children && !!icon;
    
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $iconOnly={iconOnly}
        className={className}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
            {children}
            {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 
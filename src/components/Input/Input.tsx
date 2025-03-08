import React from 'react';
import styled from 'styled-components';

interface InputBaseProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
}

export type InputProps = InputBaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Prefix = styled.div`
  position: absolute;
  left: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

const Suffix = styled.div`
  position: absolute;
  right: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ 
  $error?: boolean; 
  $hasPrefix?: boolean; 
  $hasSuffix?: boolean;
  $variant?: 'outlined' | 'filled' | 'standard';
  $size?: 'small' | 'medium' | 'large';
}>`
  width: 100%;
  padding: ${({ $size }) => 
    $size === 'small' ? '6px 10px' :
    $size === 'large' ? '10px 14px' :
    '8px 12px'
  };
  padding-left: ${({ $hasPrefix }) => $hasPrefix ? '36px' : '12px'};
  padding-right: ${({ $hasSuffix }) => $hasSuffix ? '36px' : '12px'};
  
  border: ${({ theme, $error, $variant }) => 
    $variant === 'standard' ? 'none' :
    $error ? `1px solid ${theme.colors.error}` : 
    `1px solid ${theme.colors.border}`
  };
  
  border-radius: ${({ theme, $variant }) => 
    $variant === 'standard' ? '0' : `${theme.borderRadius}px`
  };
  
  border-bottom: ${({ theme, $error, $variant }) => 
    $variant === 'standard' ? 
    ($error ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`) :
    'none'
  };
  
  background-color: ${({ theme, $variant }) => 
    $variant === 'filled' ? theme.colors.backgroundAlt : 'transparent'
  };
  
  font-size: ${({ theme, $size }) => 
    $size === 'small' ? theme.typography.fontSize.sm :
    $size === 'large' ? theme.typography.fontSize.lg :
    theme.typography.fontSize.base
  };
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    border-bottom-color: ${({ theme, $variant }) => 
      $variant === 'standard' ? theme.colors.primary : ''
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

const StyledTextArea = styled.textarea<{ 
  $error?: boolean;
  $variant?: 'outlined' | 'filled' | 'standard';
  $size?: 'small' | 'medium' | 'large';
}>`
  width: 100%;
  padding: ${({ $size }) => 
    $size === 'small' ? '6px 10px' :
    $size === 'large' ? '10px 14px' :
    '8px 12px'
  };
  
  border: ${({ theme, $error, $variant }) => 
    $variant === 'standard' ? 'none' :
    $error ? `1px solid ${theme.colors.error}` : 
    `1px solid ${theme.colors.border}`
  };
  
  border-radius: ${({ theme, $variant }) => 
    $variant === 'standard' ? '0' : `${theme.borderRadius}px`
  };
  
  border-bottom: ${({ theme, $error, $variant }) => 
    $variant === 'standard' ? 
    ($error ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`) :
    'none'
  };
  
  background-color: ${({ theme, $variant }) => 
    $variant === 'filled' ? theme.colors.backgroundAlt : 'transparent'
  };
  
  font-size: ${({ theme, $size }) => 
    $size === 'small' ? theme.typography.fontSize.sm :
    $size === 'large' ? theme.typography.fontSize.lg :
    theme.typography.fontSize.base
  };
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    border-bottom-color: ${({ theme, $variant }) => 
      $variant === 'standard' ? theme.colors.primary : ''
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
  resize: vertical;
  min-height: 80px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth, 
    prefix, 
    suffix,
    multiline, 
    rows = 3, 
    variant = 'outlined',
    size = 'medium',
    ...props 
  }, ref) => {
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          {prefix && <Prefix>{prefix}</Prefix>}
          
          {multiline ? (
            <StyledTextArea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              $error={error}
              $variant={variant}
              $size={size}
              {...props as any}
            />
          ) : (
            <StyledInput
              ref={ref as React.Ref<HTMLInputElement>}
              $error={error}
              $hasPrefix={!!prefix}
              $hasSuffix={!!suffix}
              $variant={variant}
              $size={size}
              {...props}
            />
          )}
          
          {suffix && <Suffix>{suffix}</Suffix>}
        </InputWrapper>
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input'; 
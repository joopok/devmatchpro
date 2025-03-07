import React, { ReactNode, forwardRef } from 'react';
import { 
  Card as MuiCard, 
  CardHeader as MuiCardHeader, 
  CardContent, 
  Button as MuiButton, 
  Chip, 
  Table as MuiTable, 
  Menu, 
  MenuItem,
  TextField
} from '@mui/material';

// 인터페이스 정의
interface CommonProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

// Card 컴포넌트
export const Card = (props: CommonProps) => {
  return <MuiCard {...props}>{props.children}</MuiCard>;
};

// CardHeader 컴포넌트
export const CardHeader = (props: CommonProps) => {
  return <MuiCardHeader {...props}>{props.children}</MuiCardHeader>;
};

// CardBody 컴포넌트
export const CardBody = (props: CommonProps) => {
  return <CardContent {...props}>{props.children}</CardContent>;
};

// Button 컴포넌트
interface ButtonProps extends CommonProps {
  variant?: string;
  size?: string;
}

export const Button = (props: ButtonProps) => {
  const { variant, size, children, ...rest } = props;
  
  // Bootstrap → Material-UI 변환
  let muiVariant: 'text' | 'outlined' | 'contained' = 'contained';
  let muiColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' = 'primary';
  
  // variant 처리
  if (variant === 'outline-secondary') {
    muiVariant = 'outlined';
    muiColor = 'secondary';
  } else if (variant === 'light') {
    muiVariant = 'outlined';
    muiColor = 'inherit';
  } else if (variant === 'link') {
    muiVariant = 'text';
    muiColor = 'primary';
  } else if (variant === 'primary') {
    muiVariant = 'contained';
    muiColor = 'primary';
  }
  
  // size 처리
  const muiSize = size === 'lg' ? 'large' : size === 'sm' ? 'small' : 'medium';
  
  return (
    <MuiButton 
      variant={muiVariant} 
      color={muiColor} 
      size={muiSize} 
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

// Badge 컴포넌트
interface BadgeProps extends CommonProps {
  variant?: string;
}

export const Badge = (props: BadgeProps) => {
  const { variant, children, ...rest } = props;
  
  // Bootstrap → Material-UI 변환
  let color: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' = 'default';
  
  if (variant === 'success') {
    color = 'success';
  } else if (variant === 'danger') {
    color = 'error';
  }
  
  return <Chip color={color} size="small" label={children} {...rest} />;
};

// Table 컴포넌트
interface TableProps extends CommonProps {
  responsive?: boolean;
  size?: string;
}

export const Table = (props: TableProps) => {
  const { responsive, size, children, ...rest } = props;
  const muiSize = size === 'sm' ? 'small' : 'medium';
  
  if (responsive) {
    return (
      <div style={{ overflowX: 'auto' }}>
        <MuiTable size={muiSize} {...rest}>
          {children}
        </MuiTable>
      </div>
    );
  }
  
  return (
    <MuiTable size={muiSize} {...rest}>
      {children}
    </MuiTable>
  );
};

// InputGroup 컴포넌트
export const InputGroup = (props: CommonProps) => {
  const { children, className, ...rest } = props;
  
  return (
    <div className={`input-group ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

// FormControl 컴포넌트
export const FormControl = forwardRef<HTMLInputElement, CommonProps>((props, ref) => {
  return <TextField fullWidth variant="outlined" inputRef={ref} {...props} />;
});

// Dropdown 네임스페이스
export const Dropdown = Object.assign(
  // 메인 Dropdown 컴포넌트
  (props: CommonProps) => {
    const { children, ...rest } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    // 더 간단한 방식으로 처리
    return (
      <div {...rest}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          
          const childProps: any = {};
          
          if (child.type === Dropdown.Toggle) {
            childProps.onClick = handleClick;
          } else if (child.type === Dropdown.Menu) {
            childProps.anchorEl = anchorEl;
            childProps.open = open;
            childProps.onClose = handleClose;
          }
          
          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  },
  {
    // Toggle 컴포넌트
    Toggle: (props: CommonProps) => {
      const { children, variant, className, ...rest } = props;
      
      return (
        <MuiButton
          variant={variant === 'link' ? 'text' : 'outlined'}
          color="inherit"
          className={className}
          {...rest}
        >
          {children}
        </MuiButton>
      );
    },
    
    // Menu 컴포넌트
    Menu: (props: CommonProps & { anchorEl?: HTMLElement | null, open?: boolean, onClose?: () => void }) => {
      const { children, anchorEl, open, onClose, ...rest } = props;
      
      return (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(open)}
          onClose={onClose}
          {...rest}
        >
          {children}
        </Menu>
      );
    },
    
    // Item 컴포넌트
    Item: (props: CommonProps) => {
      const { children, ...rest } = props;
      
      return (
        <MenuItem {...rest}>
          {children}
        </MenuItem>
      );
    }
  }
); 
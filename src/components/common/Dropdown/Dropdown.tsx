import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={dropdownRef}>
      <TriggerWrapper onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </TriggerWrapper>
      {isOpen && (
        <Menu>
          {items.map((item) =>
            item.divider ? (
              <Divider key={item.id} />
            ) : (
              <MenuItem
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                $danger={item.danger}
              >
                {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
                {item.label}
              </MenuItem>
            )
          )}
        </Menu>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const TriggerWrapper = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const MenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error : theme.colors.text};
  font-size: 14px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 4px 0;
`; 
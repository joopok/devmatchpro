import React, { useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

interface SkillInputProps {
  onSubmit: (skill: string) => void;
  placeholder?: string;
}

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SkillInput: React.FC<SkillInputProps> = ({
  onSubmit,
  placeholder,
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
}; 
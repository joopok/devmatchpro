import React, { useState } from 'react';
import { Input } from '../Input';

interface SkillInputProps {
  onSubmit: (skill: string) => void;
  placeholder?: string;
}

export const SkillInput: React.FC<SkillInputProps> = ({ onSubmit, placeholder }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </form>
  );
}; 
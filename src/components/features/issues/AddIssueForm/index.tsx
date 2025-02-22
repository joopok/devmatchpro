import React from 'react';
import { useForm } from 'react-hook-form';

interface AddIssueFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export const AddIssueForm: React.FC<AddIssueFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}; 
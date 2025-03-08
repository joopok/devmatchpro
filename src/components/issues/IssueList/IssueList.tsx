import React from 'react';
import { AddIssueForm } from '../AddIssueForm';
import { useIssues } from '../../../hooks/useIssues';

export const IssueList: React.FC = () => {
  const { addIssue } = useIssues();

  const handleAddIssue = async (data: any) => {
    await addIssue(data);
  };

  return (
    <div>
      <AddIssueForm onSubmit={handleAddIssue} />
      {/* ... 나머지 코드 ... */}
    </div>
  );
}; 
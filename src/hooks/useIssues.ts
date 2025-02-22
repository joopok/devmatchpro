import { useState } from 'react';

interface Issue {
  id: string;
  title: string;
  description: string;
  // ... 기타 필드
}

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const addIssue = async (data: Partial<Issue>) => {
    // 이슈 추가 로직 구현
  };

  return {
    issues,
    addIssue,
  };
}; 
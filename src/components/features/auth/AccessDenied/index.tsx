import React from 'react';

interface AccessDeniedProps {
  permissions: Array<{
    resource: string;
    action: string;
    scope: 'all' | 'own';
  }>;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ permissions }) => {
  return (
    <div>
      <h3>접근 권한이 없습니다</h3>
      <p>필요한 권한:</p>
      <ul>
        {permissions.map((p, i) => (
          <li key={i}>{`${p.resource} ${p.action} (${p.scope})`}</li>
        ))}
      </ul>
    </div>
  );
}; 
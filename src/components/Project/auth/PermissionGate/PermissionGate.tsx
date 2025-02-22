import React from 'react';
import { usePermissions } from '../../../../hooks/usePermissions';
import { ErrorBoundary } from '../../../common/ErrorBoundary';
import { AccessDenied } from '../AccessDenied';

interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  scope: 'all' | 'own';
}

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: Permission | Permission[];
  fallback?: React.ReactNode;
  requireAll?: boolean;
  showError?: boolean;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permissions,
  fallback,
  requireAll = true,
  showError = true,
}) => {
  const { checkPermission, isLoading } = usePermissions();

  if (isLoading) {
    return null;
  }

  const permissionArray = Array.isArray(permissions)
    ? permissions
    : [permissions];

  const hasPermission = requireAll
    ? permissionArray.every((permission) => checkPermission(permission))
    : permissionArray.some((permission) => checkPermission(permission));

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showError) {
      return <AccessDenied permissions={permissionArray} />;
    }

    return null;
  }

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

// HOC 버전
export function withPermissions(
  WrappedComponent: React.ComponentType<any>,
  permissions: Permission | Permission[],
  options: {
    fallback?: React.ReactNode;
    requireAll?: boolean;
    showError?: boolean;
  } = {}
) {
  return function WithPermissionsComponent(props: any) {
    return (
      <PermissionGate
        permissions={permissions}
        fallback={options.fallback}
        requireAll={options.requireAll}
        showError={options.showError}
      >
        <WrappedComponent {...props} />
      </PermissionGate>
    );
  };
}

// 사용 예시:
// @withPermissions({ resource: 'users', action: 'manage' })
// class AdminPanel extends React.Component {
//   ...
// }
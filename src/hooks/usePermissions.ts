import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  scope: 'own' | 'all';
}

export const usePermissions = () => {
  const { user } = useAuth();
  
  const { data: permissions = [], isLoading } = useQuery({
    queryKey: ['permissions', user?.username],
    queryFn: async () => {
      const response = await fetch('/api/permissions');
      return response.json();
    },
    enabled: !!user
  });

  const checkPermission = (permission: Permission): boolean => {
    if (!permissions || isLoading) {
      return false;
    }

    const hasManagePermission = permissions.some(
      (p: Permission) => 
        p.resource === permission.resource && 
        p.action === 'manage'
    );

    return hasManagePermission || permissions.some(
      (p: Permission) => 
        p.resource === permission.resource && 
        p.action === permission.action
    );
  };

  return {
    checkPermission,
    isLoading,
  };
}; 
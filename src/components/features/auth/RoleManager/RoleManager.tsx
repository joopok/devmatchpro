import React, { useState, useEffect } from 'react';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Checkbox } from '../../../common/Checkbox';
import { Card } from '../../../common/Card';
import { Tag } from '../../../common/Tag';
import {
  ManagerContainer,
  RoleList,
  RoleCard,
  PermissionGrid,
  ResourceGroup,
  ActionGroup,
} from './RoleManager.styles';
import { TextArea } from '../../../common/TextArea';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  resource: string;
  action: string;
  scope?: 'own' | 'all';
}

interface Resource {
  name: string;
  displayName: string;
  description: string;
  actions: Array<{
    name: string;
    displayName: string;
    description: string;
  }>;
}

interface RoleManagerProps {
  roles: Role[];
  resources: Resource[];
  onCreateRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdateRole: (roleId: string, updates: Partial<Role>) => Promise<void>;
  onDeleteRole: (roleId: string) => Promise<void>;
  isLoading?: boolean;
}

export const RoleManager: React.FC<RoleManagerProps> = ({
  roles,
  resources,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  isLoading,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[],
  });

  const handlePermissionToggle = (
    roleId: string,
    resource: string,
    action: string,
    scope: 'own' | 'all' = 'all'
  ) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role || role.isSystem) return;

    const hasPermission = role.permissions.some(
      (p) =>
        p.resource === resource &&
        p.action === action &&
        p.scope === scope
    );

    const updatedPermissions = hasPermission
      ? role.permissions.filter(
          (p) =>
            !(
              p.resource === resource &&
              p.action === action &&
              p.scope === scope
            )
        )
      : [
          ...role.permissions,
          { resource, action, scope },
        ];

    onUpdateRole(roleId, { permissions: updatedPermissions });
  };

  const handleCreateRole = async () => {
    if (!newRole.name.trim()) return;

    await onCreateRole(newRole);
    setNewRole({
      name: '',
      description: '',
      permissions: [],
    });
  };

  const handleDeleteRole = async (roleId: string) => {
    if (window.confirm('이 역할을 삭제하시겠습니까?')) {
      await onDeleteRole(roleId);
      if (selectedRole?.id === roleId) {
        setSelectedRole(null);
      }
    }
  };

  const handleDescriptionChange = (value: string) => {
    setNewRole((prev) => ({ ...prev, description: value }));
  };

  return (
    <ManagerContainer>
      <div>
        <h2>역할 관리</h2>
        <Button
          onClick={() => setEditMode(!editMode)}
          variant="outline"
        >
          {editMode ? '보기 모드' : '편집 모드'}
        </Button>
      </div>

      <RoleList>
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            selected={selectedRole?.id === role.id}
            onClick={() => setSelectedRole(role)}
          >
            <div>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
              {role.isSystem && <Tag label="시스템" color="warning" />}
            </div>
            {editMode && !role.isSystem && (
              <Button
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRole(role.id);
                }}
                disabled={isLoading}
              >
                삭제
              </Button>
            )}
          </RoleCard>
        ))}

        {editMode && (
          <Card>
            <Input
              label="역할 이름"
              value={newRole.name}
              onChange={(e) =>
                setNewRole((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="새 역할 이름"
            />
            <TextArea
              label="설명"
              value={newRole.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="역할 설명"
              rows={4}
            />
            <Button
              onClick={handleCreateRole}
              disabled={isLoading || !newRole.name.trim()}
            >
              역할 생성
            </Button>
          </Card>
        )}
      </RoleList>

      {selectedRole && (
        <PermissionGrid>
          <h3>{selectedRole.name} 권한</h3>
          {resources.map((resource) => (
            <ResourceGroup key={resource.name}>
              <h4>
                {resource.displayName}
                <small>{resource.description}</small>
              </h4>
              <ActionGroup>
                {resource.actions.map((action) => (
                  <div key={action.name}>
                    <Checkbox
                      label={action.displayName}
                      checked={selectedRole.permissions.some(
                        (p) =>
                          p.resource === resource.name &&
                          p.action === action.name &&
                          p.scope === 'all'
                      )}
                      onChange={() =>
                        handlePermissionToggle(
                          selectedRole.id,
                          resource.name,
                          action.name,
                          'all'
                        )
                      }
                      disabled={isLoading || selectedRole.isSystem}
                    />
                    <small>{action.description}</small>
                    {action.name !== 'manage' && (
                      <Checkbox
                        label="자신의 것만"
                        checked={selectedRole.permissions.some(
                          (p) =>
                            p.resource === resource.name &&
                            p.action === action.name &&
                            p.scope === 'own'
                        )}
                        onChange={() =>
                          handlePermissionToggle(
                            selectedRole.id,
                            resource.name,
                            action.name,
                            'own'
                          )
                        }
                        disabled={isLoading || selectedRole.isSystem}
                      />
                    )}
                  </div>
                ))}
              </ActionGroup>
            </ResourceGroup>
          ))}
        </PermissionGrid>
      )}
    </ManagerContainer>
  );
};
import React, { useState } from 'react';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { Tag } from '../../../common/Tag';
import { Card } from '../../../common/Card'; 
import {
  ManagerContainer,
  KeyList,
  KeyItem,
  KeyInfo,
  CreateKeyForm,
  Permissions,
} from './ApiKeyManager.styles';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  expiresAt?: string;
  lastUsed?: string;
  status: 'active' | 'expired' | 'revoked';
}

interface ApiKeyManagerProps {
  apiKeys: ApiKey[];
  availablePermissions: string[];
  onCreateKey: (name: string, permissions: string[]) => Promise<void>;
  onRevokeKey: (id: string) => Promise<void>;
  onRegenerateKey: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  apiKeys,
  availablePermissions,
  onCreateKey,
  onRevokeKey,
  onRegenerateKey,
  isLoading,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showKey, setShowKey] = useState<string | null>(null);

  const handleCreateKey = async () => {
    if (!newKeyName.trim() || selectedPermissions.length === 0) return;

    try {
      await onCreateKey(newKeyName, selectedPermissions);
      setNewKeyName('');
      setSelectedPermissions([]);
      setShowCreateForm(false);
    } catch (error) {
      {{ console.error('API 키 생성 실패:', error); }}
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: ApiKey['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'warning';
      case 'revoked':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <ManagerContainer>
      <div>
        <h2>API 키 관리</h2>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={isLoading}
        >
          새 API 키 생성
        </Button>
      </div>

      {showCreateForm && (
        <CreateKeyForm>
          <Card>
            <h3>새 API 키 생성</h3>
            <Input
              label="키 이름"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="API 키의 용도를 설명하는 이름"
              required
            />
            <Permissions>
              <h4>권한</h4>
              <div>
                {availablePermissions.map((permission) => (
                  <Tag
                    key={permission}
                    label={permission}
                    onClick={() => handlePermissionToggle(permission)}
                    selected={selectedPermissions.includes(permission)}
                  />
                ))}
              </div>
            </Permissions>
            <div>
              <Button
                onClick={handleCreateKey}
                disabled={
                  isLoading ||
                  !newKeyName.trim() ||
                  selectedPermissions.length === 0
                }
              >
                생성
              </Button>
              <Button
                variant="text"
                onClick={() => setShowCreateForm(false)}
                disabled={isLoading}
              >
                취소
              </Button>
            </div>
          </Card>
        </CreateKeyForm>
      )}

      <KeyList>
        {apiKeys.map((apiKey) => (
          <KeyItem key={apiKey.id}>
            <KeyInfo>
              <div>
                <h3>{apiKey.name}</h3>
                <Tag
                  label={apiKey.status}
                  color={getStatusColor(apiKey.status)}
                />
              </div>
              <div>
                {showKey === apiKey.id ? (
                  <code>{apiKey.key}</code>
                ) : (
                  <code>••••••••••••••••</code>
                )}
                <Button
                  variant="text"
                  onClick={() =>
                    setShowKey(showKey === apiKey.id ? null : apiKey.id)
                  }
                >
                  {showKey === apiKey.id ? '숨기기' : '보기'}
                </Button>
              </div>
              <div>
                {apiKey.permissions.map((permission) => (
                  <Tag key={permission} label={permission} variant="outline" />
                ))}
              </div>
              <small>
                생성: {formatDate(apiKey.createdAt)}
                {apiKey.expiresAt && (
                  <> • 만료: {formatDate(apiKey.expiresAt)}</>
                )}
                {apiKey.lastUsed && (
                  <> • 마지막 사용: {formatDate(apiKey.lastUsed)}</>
                )}
              </small>
            </KeyInfo>
            <div>
              {apiKey.status === 'active' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => onRegenerateKey(apiKey.id)}
                    disabled={isLoading}
                  >
                    재발급
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onRevokeKey(apiKey.id)}
                    disabled={isLoading}
                  >
                    폐기
                  </Button>
                </>
              )}
            </div>
          </KeyItem>
        ))}
      </KeyList>
    </ManagerContainer>
  );
}; 
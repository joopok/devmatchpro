import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Select } from '../../../common/Select';
import {
  InviteContainer,
  FormGroup,
  InviteList,
  InviteItem,
  ItemInfo,
  Actions,
} from './TeamInvite.styles';
import { Controller } from 'react-hook-form';

interface InviteFormData {
  email: string;
  role: string;
}

interface PendingInvite {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

interface TeamInviteProps {
  pendingInvites: PendingInvite[];
  onInvite: (data: InviteFormData) => Promise<void>;
  onResend: (inviteId: string) => Promise<void>;
  onCancel: (inviteId: string) => Promise<void>;
  isLoading?: boolean;
}

const roleOptions = [
  { value: 'MEMBER', label: '팀원' },
  { value: 'ADMIN', label: '관리자' },
];

export const TeamInvite: React.FC<TeamInviteProps> = ({
  pendingInvites,
  onInvite,
  onResend,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<InviteFormData>({
    defaultValues: {
      role: 'MEMBER',
    },
  });

  const handleInvite = async (data: InviteFormData) => {
    await onInvite(data);
    reset();
  };

  return (
    <InviteContainer>
      <form onSubmit={handleSubmit(handleInvite)}>
        <FormGroup>
          <Input
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 주소를 입력해주세요',
              },
            })}
            label="이메일"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="역할"
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
          >
            초대하기
          </Button>
        </FormGroup>
      </form>

      {pendingInvites.length > 0 && (
        <InviteList>
          <h3>대기 중인 초대</h3>
          {pendingInvites.map(invite => (
            <InviteItem key={invite.id}>
              <ItemInfo>
                <p>{invite.email}</p>
                <span>{invite.role}</span>
                <small>
                  {new Date(invite.createdAt).toLocaleDateString()}
                </small>
              </ItemInfo>
              <Actions>
                <Button
                  variant="outline"
                  onClick={() => onResend(invite.id)}
                  disabled={isLoading}
                >
                  재발송
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onCancel(invite.id)}
                  disabled={isLoading}
                >
                  취소
                </Button>
              </Actions>
            </InviteItem>
          ))}
        </InviteList>
      )}
    </InviteContainer>
  );
}; 
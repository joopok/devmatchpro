import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Switch } from '../../../common/Switch';
import { Card } from '../../../common/Card';
import {
  SettingsContainer,
  Section,
  SectionTitle,
  FormGroup,
  DeleteAccount,
  NotificationPreferences,
  SecuritySettings,
} from './AccountSettings.styles';

interface AccountSettingsData {
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
}

interface AccountSettingsProps {
  initialData: AccountSettingsData;
  onUpdate: (data: Partial<AccountSettingsData>) => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  onEnableTwoFactor: () => Promise<void>;
  isLoading?: boolean;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({
  initialData,
  onUpdate,
  onDeleteAccount,
  onEnableTwoFactor,
  isLoading,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountSettingsData>({
    defaultValues: initialData,
  });

  const newPassword = watch('newPassword');

  const handlePasswordUpdate = async (data: AccountSettingsData) => {
    if (data.newPassword !== data.confirmPassword) {
      return;
    }
    await onUpdate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    setShowPasswordForm(false);
  };

  const handleNotificationUpdate = async (key: keyof AccountSettingsData['notifications'], value: boolean) => {
    await onUpdate({
      notifications: {
        ...initialData.notifications,
        [key]: value,
      },
    });
  };

  return (
    <SettingsContainer>
      <Section>
        <SectionTitle>계정 정보</SectionTitle>
        <Card>
          <FormGroup>
            <Input
              label="이메일"
              {...register('email')}
              disabled
            />
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              비밀번호 변경
            </Button>
          </FormGroup>

          {showPasswordForm && (
            <form onSubmit={handleSubmit(handlePasswordUpdate)}>
              <Input
                type="password"
                label="현재 비밀번호"
                {...register('currentPassword', {
                  required: '현재 비밀번호를 입력해주세요',
                })}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
              <Input
                type="password"
                label="새 비밀번호"
                {...register('newPassword', {
                  required: '새 비밀번호를 입력해주세요',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자 이상이어야 합니다',
                  },
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
              <Input
                type="password"
                label="새 비밀번호 확인"
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === newPassword || '비밀번호가 일치하지 않습니다',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <Button type="submit" disabled={isLoading}>
                비밀번호 변경
              </Button>
            </form>
          )}
        </Card>
      </Section>

      <Section>
        <SectionTitle>보안 설정</SectionTitle>
        <SecuritySettings>
          <Card>
            <h4>2단계 인증</h4>
            <p>
              계정 보안을 강화하기 위해 2단계 인증을 설정하세요.
            </p>
            <Switch
              checked={initialData.twoFactorEnabled}
              onChange={() => onEnableTwoFactor()}
              label="2단계 인증 사용"
            />
          </Card>
        </SecuritySettings>
      </Section>

      <Section>
        <SectionTitle>알림 설정</SectionTitle>
        <NotificationPreferences>
          <Card>
            <FormGroup>
              <Switch
                checked={initialData.notifications.email}
                onChange={(checked) => handleNotificationUpdate('email', checked)}
                label="이메일 알림"
              />
              <Switch
                checked={initialData.notifications.push}
                onChange={(checked) => handleNotificationUpdate('push', checked)}
                label="푸시 알림"
              />
              <Switch
                checked={initialData.notifications.sms}
                onChange={(checked) => handleNotificationUpdate('sms', checked)}
                label="SMS 알림"
              />
              <Switch
                checked={initialData.notifications.marketing}
                onChange={(checked) => handleNotificationUpdate('marketing', checked)}
                label="마케팅 정보 수신"
              />
            </FormGroup>
          </Card>
        </NotificationPreferences>
      </Section>

      <Section>
        <SectionTitle>기본 설정</SectionTitle>
        <Card>
          <FormGroup>
            <select
              {...register('language')}
              onChange={(e) => onUpdate({ language: e.target.value })}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>

            <select
              {...register('timezone')}
              onChange={(e) => onUpdate({ timezone: e.target.value })}
            >
              <option value="Asia/Seoul">서울 (GMT+9)</option>
              <option value="Asia/Tokyo">도쿄 (GMT+9)</option>
              <option value="America/Los_Angeles">로스앤젤레스 (GMT-7)</option>
            </select>
          </FormGroup>
        </Card>
      </Section>

      <DeleteAccount>
        <Card>
          <h4>계정 삭제</h4>
          <p>
            계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
            이 작업은 되돌릴 수 없습니다.
          </p>
          {!showDeleteConfirm ? (
            <Button
              variant="danger"
              onClick={() => setShowDeleteConfirm(true)}
            >
              계정 삭제
            </Button>
          ) : (
            <div>
              <p>정말로 계정을 삭제하시겠습니까?</p>
              <Button
                variant="danger"
                onClick={onDeleteAccount}
                disabled={isLoading}
              >
                예, 삭제합니다
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                취소
              </Button>
            </div>
          )}
        </Card>
      </DeleteAccount>
    </SettingsContainer>
  );
}; 
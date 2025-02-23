import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../../../store/store';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { Tag } from '../../../common/Tag';
import { useToast } from '../../../common/Toast';
import {
  Form,
  Section,
  InputGroup,
  ButtonGroup,
} from './ProfileEdit.styles';
import { TextArea } from '../../../common/TextArea';
import { useAuth } from '../../../../hooks/useAuth';

interface User {
  name?: string;
  bio?: string;
  username?: string;
  email?: string;
  githubUrl?: string;
  role?: string;
  portfolioUrl?: string;
}

interface ProfileFormData {
  name?: string;
  bio?: string;
  username?: string;
  email?: string;
  githubUrl?: string;
  role?: string;
  portfolioUrl?: string;
}

export const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const { show } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.username || '',
      bio: user?.bio || '',
      role: user?.role || '',
      githubUrl: user?.githubUrl || '',
      portfolioUrl: user?.portfolioUrl || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // await updateProfile(data);
      show('success', '프로필이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      show('error', '프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <InputGroup>
          <Input
            {...register('name', { required: '이름은 필수입니다.' })}
            label="이름"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </InputGroup>

        <InputGroup>
          <TextArea
            {...register('bio')}
            label="소개"
            rows={4}
          />
        </InputGroup>

        {user?.role === 'DEVELOPER' && (
          <>
            <InputGroup>
              <Input
                {...register('githubUrl')}
                label="GitHub URL"
                placeholder="https://github.com/username"
              />
            </InputGroup>

            <InputGroup>
              <Input
                {...register('portfolioUrl')}
                label="포트폴리오 URL"
                placeholder="https://portfolio.com"
              />
            </InputGroup>
          </>
        )}
      </Section>

      <ButtonGroup>
        <Button variant="outline" type="button">
          취소
        </Button>
        <Button type="submit">
          저장
        </Button>
      </ButtonGroup>
    </Form>
  );
}; 
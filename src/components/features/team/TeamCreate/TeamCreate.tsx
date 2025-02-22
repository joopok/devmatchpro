import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { ImageUpload } from '../../../common/ImageUpload';
import { TextArea } from '../../../common/TextArea';
import {
  CreateContainer,
  FormGroup,
} from './TeamCreate.styles';

interface TeamCreateData {
  name: string;
  description: string;
  profileImage?: File;
}

interface TeamCreateProps {
  onSubmit: (data: TeamCreateData) => Promise<void>;
  isLoading?: boolean;
}

export const TeamCreate: React.FC<TeamCreateProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamCreateData>();

  const handleImageUpload = (file: File) => {
    setValue('profileImage', file);
  };

  return (
    <CreateContainer>
      <h2>새 팀 만들기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <ImageUpload
            onImageSelect={handleImageUpload}
            defaultImage="/team-default.png"
          />
          <Input
            {...register('name', {
              required: '팀 이름을 입력해주세요',
            })}
            label="팀 이름"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextArea
            {...register('description')}
            label="팀 소개"
            rows={4}
            placeholder="팀에 대한 설명을 입력해주세요"
          />
          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? '생성 중...' : '팀 생성하기'}
          </Button>
        </FormGroup>
      </form>
    </CreateContainer>
  );
}; 
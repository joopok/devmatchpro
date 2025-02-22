import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { ImageUpload } from '../../../common/ImageUpload';
import {
  SettingsContainer,
  Section,
  SectionTitle,
  FormGroup,
  AvatarSection,
  SkillsSection,
  SkillChips,
} from './ProfileSettings.styles';
import { TextArea } from '../../../common/TextArea/TextArea';
import { Avatar } from '../../../common/Avatar';
import styled from 'styled-components';

interface ProfileSettingsData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  profileImage?: File;
  website?: string;
  github?: string;
  linkedin?: string;
  email: string;
}

interface ProfileSettingsProps {
  initialData: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    profileImage?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    email: string;
  };
  onSubmit: (data: ProfileSettingsData) => Promise<void>;
  isLoading?: boolean;
}

const StyledSkillInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 100%;
`;

const SkillForm = styled.form`
  display: flex;
  gap: 8px;
`;

const SkillInput: React.FC<{ placeholder?: string; onAdd: (value: string) => void }> = ({ 
  placeholder, 
  onAdd 
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <SkillForm onSubmit={handleSubmit}>
      <StyledSkillInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </SkillForm>
  );
};

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileSettingsData>({
    defaultValues: {
      ...initialData,
      profileImage: undefined,
    },
  });

  const skills = watch('skills') || [];

  const handleImageUpload = (file: File) => {
    setValue('profileImage', file);
  };

  const handleAddSkill = (value: string) => {
    if (value && !skills.includes(value)) {
      setValue('skills', [...skills, value]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue('skills', skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmitForm = async (data: ProfileSettingsData) => {
    // TODO: 프로필 업데이트 로직 구현
  };

  return (
    <SettingsContainer>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Section>
          <SectionTitle>프로필 이미지</SectionTitle>
          <AvatarSection>
            <ImageUpload
              currentImage={initialData.profileImage}
              onImageSelect={handleImageUpload}
            />
          </AvatarSection>
        </Section>

        <Section>
          <SectionTitle>기본 정보</SectionTitle>
          <FormGroup>
            <Input
              {...register('name', {
                required: '이름을 입력해주세요',
              })}
              label="이름"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Input
              {...register('title', {
                required: '직함을 입력해주세요',
              })}
              label="직함"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 주소를 입력해주세요',
                },
              })}
              label="이메일"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextArea
              {...register('bio')}
              label="자기소개"
              rows={4}
              error={!!errors.bio}
              helperText={errors.bio?.message}
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <SkillsSection>
            <SkillInput
              placeholder="기술 스택을 입력하세요"
              onAdd={handleAddSkill}
            />
            <SkillChips>
              {skills.map(skill => (
                <span key={skill} onClick={() => handleRemoveSkill(skill)}>
                  {skill} ✕
                </span>
              ))}
            </SkillChips>
          </SkillsSection>
        </Section>

        <Section>
          <SectionTitle>소셜 링크</SectionTitle>
          <FormGroup>
            <Input
              {...register('website')}
              label="웹사이트"
              placeholder="https://"
            />
            <Input
              {...register('github')}
              label="GitHub"
              placeholder="https://github.com/username"
            />
            <Input
              {...register('linkedin')}
              label="LinkedIn"
              placeholder="https://linkedin.com/in/username"
            />
          </FormGroup>
        </Section>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </SettingsContainer>
  );
}; 
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Tag } from '../../../common/Tag';
import {
  EditorContainer,
  Section,
  SectionTitle,
  InputGroup,
  SkillsContainer,
  ExperienceList,
  ExperienceItem,
  AddButton,
} from './ProfileEditor.styles';
import { DeveloperProfile, Experience, WorkType } from '../../../../types/user';
import { TextArea } from '../../../common/TextArea';

interface ProfileEditorData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: number;
  preferredWorkType: WorkType[];
  experiences: Experience[];
  portfolio: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

interface ProfileEditorProps {
  initialData?: Partial<DeveloperProfile>;
  onSubmit: (data: ProfileEditorData) => void;
  isLoading?: boolean;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialData?.skills || []
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditorData>({
    defaultValues: {
      ...initialData,
      experiences: initialData?.experiences || [
        { company: '', position: '', period: '', description: '' },
      ],
    },
  });

  const handleSkillAdd = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  return (
    <EditorContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SectionTitle>기본 정보</SectionTitle>
          <InputGroup>
            <Input
              {...register('name', { required: '이름을 입력해주세요' })}
              label="이름"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </InputGroup>

          <InputGroup>
            <Input
              {...register('title', { required: '직함을 입력해주세요' })}
              label="직함"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </InputGroup>

          <InputGroup>
            <TextArea
              {...register('bio')}
              label="자기소개"
              rows={4}
            />
          </InputGroup>
        </Section>

        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <SkillsContainer>
            {selectedSkills.map(skill => (
              <Tag
                key={skill}
                label={skill}
                onRemove={() => handleSkillRemove(skill)}
              />
            ))}
          </SkillsContainer>
        </Section>

        <Section>
          <SectionTitle>경력 사항</SectionTitle>
          <Controller
            name="experiences"
            control={control}
            render={({ field }) => (
              <ExperienceList>
                {field.value.map((exp, index) => (
                  <ExperienceItem key={index}>
                    <Input
                      {...register(`experiences.${index}.company`)}
                      label="회사명"
                    />
                    <Input
                      {...register(`experiences.${index}.position`)}
                      label="직책"
                    />
                    <Input
                      {...register(`experiences.${index}.period`)}
                      label="기간"
                    />
                    <TextArea
                      {...register(`experiences.${index}.description`)}
                      label="업무 내용"
                      rows={3}
                    />
                  </ExperienceItem>
                ))}
              </ExperienceList>
            )}
          />
          <AddButton type="button">
            경력 추가
          </AddButton>
        </Section>

        <Section>
          <SectionTitle>포트폴리오 및 링크</SectionTitle>
          <InputGroup>
            <Input
              {...register('portfolio')}
              label="포트폴리오 URL"
            />
          </InputGroup>
          <InputGroup>
            <Input
              {...register('githubUrl')}
              label="GitHub URL"
            />
          </InputGroup>
          <InputGroup>
            <Input
              {...register('linkedinUrl')}
              label="LinkedIn URL"
            />
          </InputGroup>
        </Section>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </EditorContainer>
  );
}; 
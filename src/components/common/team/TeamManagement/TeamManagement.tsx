import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { FileUpload } from '../../../common/FileUpload';
import { Select } from '../../../common/Select';
import {
  ManagementContainer,
  Section,
  SectionTitle,
  FormGroup,
  MemberList,
  MemberItem,
  MemberInfo,
  RoleSelect,
  Actions,
} from './TeamManagement.styles';
import { Controller } from 'react-hook-form';
import { TextArea } from '../../../common/TextArea';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}

interface TeamFormData {
  name: string;
  description: string;
  profileImage?: File;
  members: {
    [key: string]: {
      role: string;
    };
  };
}

interface TeamManagementProps {
  teamId: string;
  initialData: {
    name: string;
    description: string;
    profileImage?: string;
    members: TeamMember[];
  };
  onUpdate: (data: TeamFormData) => Promise<void>;
  onMemberUpdate: (memberId: string, role: string) => Promise<void>;
  onMemberRemove: (memberId: string) => Promise<void>;
  isLoading?: boolean;
}

const roleOptions = [
  { value: 'OWNER', label: '팀장' },
  { value: 'ADMIN', label: '관리자' },
  { value: 'MEMBER', label: '팀원' },
];

export const TeamManagement: React.FC<TeamManagementProps> = ({
  teamId,
  initialData,
  onUpdate,
  onMemberUpdate,
  onMemberRemove,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TeamFormData>({
    defaultValues: {
      name: initialData.name,
      description: initialData.description,
      members: initialData.members.reduce((acc, member) => ({
        ...acc,
        [member.id]: { role: member.role }
      }), {}),
    },
  });

  const handleImageUpload = (file: File) => {
    setValue('profileImage', file);
  };

  return (
    <ManagementContainer>
      <form onSubmit={handleSubmit(onUpdate)}>
        <Section>
          <SectionTitle>팀 정보</SectionTitle>
          <FormGroup>
            <FileUpload
              onUpload={(files: FileList) => handleImageUpload(files[0])}
              accept="image/*"
            >
              <img 
                src={initialData.profileImage || "/team-default.png"} 
                alt="Team profile" 
                style={{ width: 100, height: 100, borderRadius: '50%' }}
              />
            </FileUpload>
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
            />
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '변경사항 저장'}
            </Button>
          </FormGroup>
        </Section>
      </form>

      <Section>
        <SectionTitle>팀원 관리</SectionTitle>
        <MemberList>
          {initialData.members.map(member => (
            <MemberItem key={member.id}>
              <MemberInfo>
                <img src={member.profileImage} alt={member.name} />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.email}</p>
                </div>
              </MemberInfo>
              <Actions>
                <Controller
                  name={`members.${member.id}.role`}
                  control={control}
                  render={({ field }) => (
                    <RoleSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={roleOptions}
                    />
                  )}
                />
                <Button
                  variant="danger"
                  onClick={() => onMemberRemove(member.id)}
                >
                  제거
                </Button>
              </Actions>
            </MemberItem>
          ))}
        </MemberList>
      </Section>
    </ManagementContainer>
  );
}; 
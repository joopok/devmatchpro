import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeveloperProfile, ClientProfile } from '../../../../types/user';
import { SkillsList } from '../SkillsList/SkillsList';
import {
  ProfileContainer,
  Header,
  Avatar,
  UserInfo,
  Name,
  Role,
  Bio,
  Section,
  SectionTitle,
  ContactInfo,
  EditButton,
} from './ProfileCard.styles';

interface ProfileCardProps {
  profile: DeveloperProfile | ClientProfile;
  isOwnProfile?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isOwnProfile = false 
}) => {
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      <Header>
        <Avatar src={profile.profileImage || '/default-avatar.png'} alt="Profile" />
        <UserInfo>
          <Name>{profile.name}</Name>
          <Role>{profile.role}</Role>
        </UserInfo>
        {isOwnProfile && (
          <EditButton onClick={() => navigate('/profile/edit')}>
            프로필 수정
          </EditButton>
        )}
      </Header>

      {profile.bio && <Bio>{profile.bio}</Bio>}

      {profile.role === 'DEVELOPER' && (
        <>
          <Section>
            <SectionTitle>보유 기술</SectionTitle>
            <SkillsList skills={profile.skills} />
          </Section>

          <Section>
            <SectionTitle>경력</SectionTitle>
            <p>{profile.experience}년</p>
          </Section>

          <Section>
            <SectionTitle>선호하는 근무 형태</SectionTitle>
            <p>{profile.preferredWorkType.join(', ')}</p>
          </Section>

          <Section>
            <SectionTitle>포트폴리오</SectionTitle>
            <ContactInfo>
              {profile.portfolio && (
                <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                  포트폴리오
                </a>
              )}
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </ContactInfo>
          </Section>
        </>
      )}

      {profile.role === 'CLIENT' && (
        <>
          <Section>
            <SectionTitle>회사</SectionTitle>
            <p>{profile.company}</p>
          </Section>

          <Section>
            <SectionTitle>직책</SectionTitle>
            <p>{profile.position}</p>
          </Section>
        </>
      )}
    </ProfileContainer>
  );
}; 
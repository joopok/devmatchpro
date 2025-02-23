import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileRole,
  ProfileDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
} from './Profile.styles';          

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage url={user.avatar || user.profileImage} />
        <ProfileInfo>
          <ProfileName>{user.username}</ProfileName>
          <ProfileRole>{user.role || '사용자'}</ProfileRole>
        </ProfileInfo>
      </ProfileHeader>

      <ProfileDetails>
        <DetailItem>
          <DetailLabel>이메일</DetailLabel>
          <DetailValue>{user.email}</DetailValue>
        </DetailItem>
        {user.bio && (
          <DetailItem>
            <DetailLabel>소개</DetailLabel>
            <DetailValue>{user.bio}</DetailValue>
          </DetailItem>
        )}
        {user.githubUrl && (
          <DetailItem>
            <DetailLabel>GitHub</DetailLabel>
            <DetailValue>
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                {user.githubUrl}
              </a>
            </DetailValue>
          </DetailItem>
        )}
        {user.portfolioUrl && (
          <DetailItem>
            <DetailLabel>포트폴리오</DetailLabel>
            <DetailValue>
              <a href={user.portfolioUrl} target="_blank" rel="noopener noreferrer">
                {user.portfolioUrl}
              </a>
            </DetailValue>
          </DetailItem>
        )}
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default Profile; 
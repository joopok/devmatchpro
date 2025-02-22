import React from 'react';
import { Avatar } from '../../../common/Avatar';
import {
  ProfileContainer,
  UserInfo,
  UserName,
  UserRole,
} from './UserProfile.styles';

interface UserProfileProps {
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  onEditClick?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onEditClick,
}) => {
  return (
    <ProfileContainer>
      <Avatar
        src={user.avatarUrl}
        name={user.name}
        size="large"
        onClick={onEditClick}
      />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserRole>{user.role}</UserRole>
      </UserInfo>
    </ProfileContainer>
  );
}; 
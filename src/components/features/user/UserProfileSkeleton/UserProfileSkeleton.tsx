import React from 'react';
import { Skeleton } from '../../../common/Skeleton';
import {
  ProfileContainer,
  InfoContainer,
  StatsContainer,
} from './UserProfileSkeleton.styles';

export const UserProfileSkeleton: React.FC = () => {
  return (
    <ProfileContainer>
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        animation="wave"
      />
      <InfoContainer>
        <Skeleton width={150} height={24} animation="wave" />
        <Skeleton width={100} height={16} animation="wave" />
      </InfoContainer>
      <StatsContainer>
        <Skeleton width="100%" height={60} animation="wave" />
      </StatsContainer>
    </ProfileContainer>
  );
}; 
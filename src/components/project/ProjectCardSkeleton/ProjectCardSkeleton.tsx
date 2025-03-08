import React from 'react';
import { Card, CardHeader, CardContent } from '../../Card';
import { Skeleton, SkeletonGroup } from '../../Skeleton';
import { MetaContainer } from './ProjectCardSkeleton.styles';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton width="60%" height={24} />
        <Skeleton variant="circular" width={32} />
      </CardHeader>
      <CardContent>
        <SkeletonGroup count={3} spacing={12} />
        <MetaContainer>
          <Skeleton width={100} />
          <Skeleton width={80} />
        </MetaContainer>
      </CardContent>
    </Card>
  );
}; 
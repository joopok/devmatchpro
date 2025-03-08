import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Avatar } from '../../Avatar';
import { Rating } from '../../Rating';
import {
  ListContainer,
  ReviewItem,
  Header,
  UserInfo,
  Name,
  Time,
  Content,
  ProjectInfo,
} from './ReviewList.styles';
import { Review } from '../../../types/review';

interface ReviewListProps {
  reviews: Review[];
  showProject?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  showProject = false,
}) => {
  if (reviews.length === 0) {
    return (
      <ListContainer>
        <p>아직 리뷰가 없습니다.</p>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {reviews.map(review => (
        <ReviewItem key={review.id}>
          <Header>
            <Avatar
              src={review.reviewer.profileImage}
              name={review.reviewer.name}
              alt={review.reviewer.name}
              size="small"
            />
            <UserInfo>
              <Name>{review.reviewer.name}</Name>
              <Rating
                value={review.rating}
                readOnly
                size="small"
              />
            </UserInfo>
            <Time>
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </Time>
          </Header>

          {showProject && (
            <ProjectInfo>
              프로젝트: {review.project.title}
            </ProjectInfo>
          )}

          <Content>{review.content}</Content>
        </ReviewItem>
      ))}
    </ListContainer>
  );
}; 
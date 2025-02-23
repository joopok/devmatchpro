import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../../../common/Avatar';
import { Rating } from '../../../common/Rating';
import { Tag } from '../../../common/Tag';
import {
  CardContainer,
  Header,
  Info,
  Name,
  Title,
  Stats,
  StatItem,
  SkillsContainer,
  Footer,
} from './DeveloperCard.styles';
import { DeveloperProfile } from '../../../../types/user';

interface DeveloperCardProps {
  developer: DeveloperProfile;
  onContactClick?: (developerId: string) => void;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({
  developer,
  onContactClick,
}) => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick(developer.id);
    }
  };

  return (
    <CardContainer to={`/developers/${developer.id}`}>
      <Header>
        <Avatar
          src={developer.profileImage}
          name={developer.username}
          alt={developer.username}
          size="large"
        />
        <Info>
          <Name>{developer.name}</Name>
          <Title>{developer.title}</Title>
          <Rating
            value={developer.rating}
            readOnly
            size="small"
            text={`${developer.reviewCount}개의 리뷰`}
          />
        </Info>
      </Header>

      <Stats>
        <StatItem>
          <span>완료 프로젝트</span>
          <strong>{developer.completedProjects}</strong>
        </StatItem>
        <StatItem>
          <span>성공률</span>
          <strong>{developer.successRate}%</strong>
        </StatItem>
        <StatItem>
          <span>평균 응답 시간</span>
          <strong>{developer.averageResponseTime}</strong>
        </StatItem>
      </Stats>

      <SkillsContainer>
        {developer.skills.slice(0, 5).map(skill => (
          <Tag key={skill} label={skill} />
        ))}
        {developer.skills.length > 5 && (
          <Tag label={`+${developer.skills.length - 5}`} />
        )}
      </SkillsContainer>

      <Footer>
        <button onClick={handleContactClick}>
          연락하기
        </button>
      </Footer>
    </CardContainer>
  );
}; 
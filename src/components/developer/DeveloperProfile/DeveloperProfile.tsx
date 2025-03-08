import React from 'react';
import { Avatar } from '../../Avatar';
import { Tag } from '../../Tag';
import { DeveloperProfile } from '../../../types/profile';
import {
  ProfileContainer,
  Header,
  Info,
  Name,
  Role,
  Stats,
  StatItem,
  Section,
  SectionTitle,
  ProjectsList,
  ProjectCard,
} from './DeveloperProfile.styles';

interface DeveloperProfileProps {
  profile: DeveloperProfile;
}

export const DeveloperProfileView: React.FC<DeveloperProfileProps> = ({ profile }) => {
  return (
    <ProfileContainer>
      <Header>
        <Avatar
          src={profile.avatar}
          name={profile.name}
          alt={profile.name}
          size="large"
        />
        <Info>
          <Name>{profile.name}</Name>
          <Role>{profile.role}</Role>
        </Info>
      </Header>

      <Stats>
        <StatItem>
          <h3>{profile.experience}</h3>
          <p>경력 (년)</p>
        </StatItem>
        <StatItem>
          <h3>{profile.skills.length}</h3>
          <p>보유 기술</p>
        </StatItem>
        <StatItem>
          <h3>{profile.portfolio.length}</h3>
          <p>프로젝트</p>
        </StatItem>
      </Stats>

      <Section>
        <SectionTitle>기술 스택</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {profile.skills.map((skill) => (
            <Tag key={skill} label={skill} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>포트폴리오</SectionTitle>
        <ProjectsList>
          {profile.portfolio.map((project) => (
            <ProjectCard key={project.id}>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div style={{ marginTop: '8px' }}>
                {project.technologies.map((tech) => (
                  <Tag
                    key={tech}
                    label={tech}
                    variant="outline"
                    size="small"
                  />
                ))}
              </div>
            </ProjectCard>
          ))}
        </ProjectsList>
      </Section>
    </ProfileContainer>
  );
}; 
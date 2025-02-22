import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Button } from '../../../common/Button';
import { Avatar } from '../../../common/Avatar';
import { ProgressBar } from '../../../common/ProgressBar';
import { Tag } from '../../../common/Tag';
import {
  DashboardContainer,
  StatsSection,
  ProjectsSection,
  MembersSection,
  ActivitySection,
  ProjectItem,
  ProjectInfo,
  MemberCard,
  ActivityItem,
} from './TeamDashboard.styles';
import { formatDate } from '../../../../utils/formatters';
import { Team, TeamProject, TeamMember, Activity } from '../../../../types/team';

interface TeamDashboardProps {
  team: Team;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({ team }) => {
  return (
    <DashboardContainer>
      <StatsSection>
        <h2>팀 현황</h2>
        <div>
          <div>
            <h3>멤버</h3>
            <p>{team.members.length}명</p>
          </div>
          <div>
            <h3>프로젝트</h3>
            <p>{team.projects.length}개</p>
          </div>
        </div>
      </StatsSection>

      <ProjectsSection>
        <h2>프로젝트</h2>
        <div>
          {team.projects.map((project: TeamProject) => (
            <ProjectItem key={project.id}>
              <ProjectInfo>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </ProjectInfo>
              <div>
                <span>마감일: {formatDate(project.deadline)}</span>
                <ProgressBar value={project.progress} />
              </div>
              <div>
                {project.members.map((member: TeamMember) => (
                  <Avatar
                    key={member.id}
                    src={member.avatar}
                    name={member.name}
                    alt={member.name}
                    size="small"
                  />
                ))}
              </div>
            </ProjectItem>
          ))}
        </div>
      </ProjectsSection>

      <MembersSection>
        <h2>팀 멤버</h2>
        <div>
          {team.members.map((member: TeamMember) => (
            <MemberCard key={member.id}>
              <Avatar
                src={member.profileImage}
                name={member.name}
                alt={member.name}
                size="medium"
              />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </MemberCard>
          ))}
        </div>
      </MembersSection>

      <ActivitySection>
        <h2>최근 활동</h2>
        <div>
          {team.activities.map((activity: Activity) => (
            <ActivityItem key={activity.id}>
              <Avatar
                src={activity.user.avatar}
                name={activity.user.name}
                alt={activity.user.name}
                size="small"
              />
              <div>
                <p>
                  <strong>{activity.user.name}</strong>
                  {activity.content}
                </p>
                {activity.project && (
                  <p>프로젝트: {activity.project.title}</p>
                )}
                <small>{formatDate(activity.timestamp)}</small>
              </div>
            </ActivityItem>
          ))}
        </div>
      </ActivitySection>
    </DashboardContainer>
  );
}; 
import React from 'react';
import { Project, ProjectStatus } from '../../../types/project';
import { Tag } from '../../Tag';
import { Button } from '../../Button';
import {
  DetailContainer,
  Header,
  Title,
  Status,
  Content,
  Section,
  SectionTitle,
  BudgetInfo,
  SkillsContainer,
  ClientInfo,
  ActionButtons,
} from './ProjectDetail.styles';
import styled from 'styled-components';

interface ProjectDetailProps {
  project: Project;
  isOwner: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onApply?: () => void;
}

const StatusBadge = styled.div<{ $status: ProjectStatus }>`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${({ $status, theme }) => 
    $status === 'OPEN' ? theme.colors.success :
    $status === 'IN_PROGRESS' ? theme.colors.warning :
    $status === 'COMPLETED' ? theme.colors.info :
    theme.colors.error};
  color: white;
`;

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  isOwner,
  onEdit,
  onDelete,
  onApply,
}) => {
  return (
    <DetailContainer>
      <Header>
        <Title>{project.title}</Title>
        <StatusBadge $status={project.status}>{project.status}</StatusBadge>
      </Header>

      <Content>
        <Section>
          <SectionTitle>프로젝트 설명</SectionTitle>
          <p>{project.description}</p>
        </Section>

        <Section>
          <SectionTitle>예산</SectionTitle>
          <BudgetInfo>
            {project.budget.min.toLocaleString()} ~ {project.budget.max.toLocaleString()} 
            {project.budget.currency}
          </BudgetInfo>
        </Section>

        <Section>
          <SectionTitle>필요 기술</SectionTitle>
          <SkillsContainer>
            {project.requiredSkills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </SkillsContainer>
        </Section>

        <Section>
          <SectionTitle>근무 형태</SectionTitle>
          <p>{project.workType}</p>
          {project.location && <p>위치: {project.location}</p>}
        </Section>

        <Section>
          <SectionTitle>프로젝트 기간</SectionTitle>
          <p>
            시작일: {new Date(project.duration.start).toLocaleDateString()}
            {project.duration.end && 
              ` ~ 종료일: ${new Date(project.duration.end).toLocaleDateString()}`}
          </p>
        </Section>

        <ClientInfo>
          <SectionTitle>클라이언트 정보</SectionTitle>
          {/* 클라이언트 정보 컴포넌트 추가 예정 */}
        </ClientInfo>

        <ActionButtons>
          {isOwner ? (
            <>
              <Button onClick={onEdit}>수정하기</Button>
              <Button variant="danger" onClick={onDelete}>삭제하기</Button>
            </>
          ) : (
            <Button onClick={onApply} disabled={project.status !== 'OPEN'}>
              지원하기
            </Button>
          )}
        </ActionButtons>
      </Content>
    </DetailContainer>
  );
}; 
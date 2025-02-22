import styled from '@emotion/styled';
import { Select } from '../../../common/Select';

export const ManagementContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const Section = styled.section`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    h3 {
      margin: 0 0 4px;
      font-size: 1rem;
      font-weight: 500;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RoleSelect = styled(Select)`
  min-width: 120px;
`; 
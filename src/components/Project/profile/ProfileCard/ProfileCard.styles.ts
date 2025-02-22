import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  margin-left: 16px;
`;

export const Name = styled.h2`
  margin: 0;
`;

export const Role = styled.p`
  color: #666;
  margin: 4px 0;
`;

export const Bio = styled.p`
  margin: 16px 0;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 8px;
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const EditButton = styled.button`
  margin-left: auto;
`; 
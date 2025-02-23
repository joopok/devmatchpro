import styled from 'styled-components';


export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const ProfileImage = styled.div<{ url?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${props => props.url || '/default-avatar.png'});
  background-size: cover;
  background-position: center;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const ProfileRole = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 1rem;
`;

export const ProfileDetails = styled.div`
  display: grid;
  gap: 1rem;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.gray[700]};
`;

export const DetailValue = styled.span`
  color: ${props => props.theme.colors.gray[900]};
`;
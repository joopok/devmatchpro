import styled from 'styled-components';

export const PreferencesContainer = styled.div`
  padding: 20px;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const ChannelGroup = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TimeRangeGroup = styled.div`
  margin-top: 16px;
`;

export const CategoryGroup = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`; 
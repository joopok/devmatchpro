import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Chat = () => {
  return (
    <ChatContainer>
      <h1>메시지</h1>
    </ChatContainer>
  );
};

export default Chat; 
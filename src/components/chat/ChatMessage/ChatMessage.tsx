import React from 'react';
import { Avatar } from '../../Avatar';
import { formatTime } from '../../../utils/date';
import {
  MessageContainer,
  MessageContent,
  SenderName,
  MessageText,
  MessageTime,
} from './ChatMessage.styles';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    timestamp: string;
    sender: {
      id: string;
      name: string;
      avatarUrl?: string;
      status?: 'online' | 'offline' | 'away';
    };
  };
  isOwn: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isOwn,
}) => {
  return (
    <MessageContainer isOwn={isOwn}>
      <Avatar
        src={message.sender.avatarUrl}
        name={message.sender.name}
        size="small"
        status={message.sender.status}
      />
      <MessageContent>
        <SenderName>{message.sender.name}</SenderName>
        <MessageText>{message.text}</MessageText>
        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
      </MessageContent>
    </MessageContainer>
  );
}; 
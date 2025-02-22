import React, { useRef, useEffect } from 'react';
import { Message } from '../../../../types/chat';
import { Avatar } from '../../../common/Avatar';
import {
  ListContainer,
  MessageGroup,
  MessageBubble,
  MessageTime,
  DateDivider,
} from './MessageList.styles';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach((message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <ListContainer ref={listRef}>
      {Object.entries(messageGroups).map(([date, msgs]) => (
        <div key={date}>
          <DateDivider>{formatDate(date)}</DateDivider>
          {msgs.map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            const showAvatar = !isCurrentUser && 
              (index === 0 || msgs[index - 1].senderId !== message.senderId);

            return (
              <MessageGroup
                key={message.id}
                isCurrentUser={isCurrentUser}
              >
                {showAvatar && (
                  <Avatar
                    src={message.sender.profileImage}
                    name={message.sender.name}
                    size="small"
                  />
                )}
                <div>
                  {showAvatar && <span>{message.sender.name}</span>}
                  <MessageBubble isCurrentUser={isCurrentUser}>
                    {message.content}
                    <MessageTime>{formatTime(message.createdAt)}</MessageTime>
                  </MessageBubble>
                </div>
              </MessageGroup>
            );
          })}
        </div>
      ))}
    </ListContainer>
  );
}; 
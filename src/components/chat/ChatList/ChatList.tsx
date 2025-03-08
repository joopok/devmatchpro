import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoom } from '../../../types/chat';
import { Avatar } from '../../Avatar';
import {
  ListContainer,
  ChatItem,
  UserInfo,
  UserName,
  LastMessage,
  MessageTime,
  UnreadBadge,
} from './ChatList.styles';

interface ChatListProps {
  chatRooms: ChatRoom[];
  currentUserId: string;
}

export const ChatList: React.FC<ChatListProps> = ({ chatRooms, currentUserId }) => {
  const navigate = useNavigate();

  const formatTime = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();
    
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return messageDate.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <ListContainer>
      {chatRooms.map((room) => {
        const otherUser = room.participants.find(p => p.id !== currentUserId);
        const unreadCount = room.unreadCount?.[currentUserId] || 0;

        return (
          <ChatItem
            key={room.id}
            onClick={() => navigate(`/chat/${room.id}`)}
            hasUnread={unreadCount > 0}
          >
            <Avatar
              src={otherUser?.profileImage}
              name={otherUser?.name || '알 수 없음'}
              size="medium"
            />
            <UserInfo>
              <UserName>{otherUser?.name}</UserName>
              <LastMessage>
                {room.lastMessage?.content || '새로운 대화를 시작하세요'}
              </LastMessage>
            </UserInfo>
            <div>
              {room.lastMessage && (
                <MessageTime>
                  {formatTime(room.lastMessage.createdAt)}
                </MessageTime>
              )}
              {unreadCount > 0 && (
                <UnreadBadge>{unreadCount}</UnreadBadge>
              )}
            </div>
          </ChatItem>
        );
      })}
    </ListContainer>
  );
}; 
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import {
  ChatContainer,
  MessageList,
  MessageItem,
  MessageContent,
  MessageTime,
  InputContainer,
} from './ChatRoom.styles';
import { Message } from '../../../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ChatRoomProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

interface MessageFormData {
  content: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
  messages,
  currentUserId,
  onSendMessage,
  isLoading = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
    setIsScrolledToBottom(isBottom);
  };

  const onSubmit = (data: MessageFormData) => {
    if (data.content.trim()) {
      onSendMessage(data.content);
      reset();
      setIsScrolledToBottom(true);
    }
  };

  return (
    <ChatContainer>
      <MessageList onScroll={handleScroll}>
        {messages.map(message => (
          <MessageItem
            key={message.id}
            isOwn={message.senderId === currentUserId}
          >
            <MessageContent isOwn={message.senderId === currentUserId}>
              {message.content}
              <MessageTime>
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </MessageTime>
            </MessageContent>
          </MessageItem>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>

      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('content', {
            required: '메시지를 입력해주세요',
          })}
          placeholder="메시지를 입력하세요"
          error={!!errors.content}
          helperText={errors.content?.message}
        />
        <Button
          type="submit"
          disabled={isLoading}
        >
          전송
        </Button>
      </InputContainer>
    </ChatContainer>
  );
}; 
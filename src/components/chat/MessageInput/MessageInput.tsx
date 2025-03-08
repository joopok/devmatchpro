import React, { useState, useRef } from 'react';
import { Button } from '../../Button';
import {
  InputContainer,
  TextArea,
  ButtonContainer,
  AttachmentButton,
  EmojiButton,
} from './MessageInput.styles';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onAttachFile?: (file: File) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onAttachFile,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachFile) {
      onAttachFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        {onAttachFile && (
          <>
            <AttachmentButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span>📎</span>
            </AttachmentButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </>
        )}
        <EmojiButton type="button">
          <span>😊</span>
        </EmojiButton>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          disabled={disabled}
          rows={1}
        />
        <ButtonContainer>
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
          >
            전송
          </Button>
        </ButtonContainer>
      </InputContainer>
    </form>
  );
}; 
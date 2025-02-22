export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: {
    name: string;
    profileImage?: string;
  };
  receiverId: string;
  roomId: string;
  createdAt: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: {
    id: string;
    name: string;
    profileImage?: string;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: {
    [userId: string]: number;
  };
} 
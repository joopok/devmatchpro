export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'DEVELOPER' | 'CLIENT'; 
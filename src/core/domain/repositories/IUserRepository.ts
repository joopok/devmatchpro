import { User } from '../entities/User';

export interface IUserRepository {
  getUser(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
} 
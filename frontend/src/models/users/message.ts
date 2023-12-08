import { User } from './user';

export interface Message {
  id: number;
  userId: number;
  groupId: number;
  content: string;
  createdAt: string;
  author: User;
}

export interface TypedMessage {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

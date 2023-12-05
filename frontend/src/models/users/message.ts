import User from './user';

export default interface Message {
  id: number;
  userId: number;
  groupId: number;
  content: string;
  createdAt: string;
  author: User;
}

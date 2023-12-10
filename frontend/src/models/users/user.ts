import Group from './group';

export interface User {
  id?: number;
  name: string;
  nickname: string;
  email: string;
  color: string;
  status: string;
  groups?: Group[];
}

export interface GroupUser {
  id: number;
  nickname: string;
  color: string;
  status: string;
}

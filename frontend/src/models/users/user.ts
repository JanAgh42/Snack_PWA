import Group from './group';

export default interface User {
  id?: number;
  name: string;
  nickname: string;
  email: string;
  color: string;
  groups?: Group[];
}

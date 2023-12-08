import { User } from './user';

export default interface Register extends User {
  password: string;
}

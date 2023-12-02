import User from './user';

export default interface AuthenticationState {
  user: User | null;
  status: 'init' | 'pending' | 'success' | 'error';
  errors: { message: string; field?: string }[];
}

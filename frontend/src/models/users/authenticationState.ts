import User from './user';

export default interface AuthenticationState {
  currentUser: User | null;
  status: 'init' | 'pending' | 'success' | 'error';
  errors: { message: string; field?: string }[];
}

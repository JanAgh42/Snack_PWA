import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

import User from 'src/models/users/user';
import Register from 'src/models/users/register';
import Login from 'src/models/users/login';
import Token from 'src/models/users/token';

class AuthService {
  async getCurrentUser(dontTriggerLogout = false): Promise<User | null> {
    try {
      return (
        await api.get('auth/get-current-user', {
          dontTriggerLogout,
        } as AxiosRequestConfig)
      ).data;
    } catch (error: any) {
      return (error as AxiosError).response?.status === 401
        ? null
        : Promise.reject(error);
    }
  }

  async registerUser(registerData: Register): Promise<User> {
    return (await api.post<User>('auth/register', registerData)).data;
  }

  async loginUser(loginData: Login): Promise<Token> {
    return (await api.post<Token>('auth/login', loginData)).data;
  }

  async logoutUser(): Promise<void> {
    await api.post('auth/logout');
  }
}

export default new AuthService();

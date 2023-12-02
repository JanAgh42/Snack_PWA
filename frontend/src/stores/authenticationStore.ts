import { defineStore } from 'pinia';

import AuthenticationState from 'src/models/users/authenticationState';
import authManager from 'src/api/managers/authManager';
import authService from 'src/api/services/authService';

import Register from 'src/models/users/register';
import Token from 'src/models/users/token';
import Login from 'src/models/users/login';
import User from 'src/models/users/user';

export const useAuthenticationStore = defineStore('auth', {
  state: (): AuthenticationState => ({
    user: null,
    status: 'init',
    errors: [],
  }),
  getters: {
    isUserAuthenticated: (state) => state.user && state.status === 'success',
  },
  actions: {
    markAuthStart(): void {
      this.status = 'pending';
      this.errors = [];
    },
    markAuthSuccess(currentUser: User | null): void {
      this.status = 'success';
      this.user = currentUser;
    },
    markAuthFailure(errors: []): void {
      this.status = 'error';
      this.errors = errors;
    },
    async verifyAndGetCurrentUser(): Promise<boolean> {
      try {
        this.markAuthStart();
        const currentUser = await authService.getCurrentUser();
        this.markAuthSuccess(currentUser);

        return this.user !== null;
      } catch (errors: any) {
        this.markAuthFailure(errors as []);
        throw errors;
      }
    },
    async loginUser(login: Login): Promise<Token> {
      try {
        this.markAuthStart();
        const token = await authService.loginUser(login);
        this.markAuthSuccess(null);

        authManager.setToken(token.content);
        return token;
      } catch (errors: any) {
        this.markAuthFailure(errors as []);
        throw errors;
      }
    },
    async registerUser(register: Register): Promise<User> {
      try {
        this.markAuthStart();
        const user = await authService.registerUser(register);
        this.markAuthSuccess(null);
        return user;
      } catch (errors: any) {
        this.markAuthFailure(errors as []);
        throw errors;
      }
    },
    async logoutUser(): Promise<void> {
      try {
        this.markAuthStart();
        await authService.logoutUser();
        this.markAuthSuccess(null);

        authManager.removeToken();
      } catch (errors: any) {
        this.markAuthFailure(errors as []);
        throw errors;
      }
    },
  },
});

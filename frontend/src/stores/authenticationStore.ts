import { defineStore } from 'pinia';

import { reactive, computed } from 'vue';

import AuthenticationState from 'src/models/users/authenticationState';
import authManager from 'src/api/managers/authManager';
import authService from 'src/api/services/authService';
import { useGroupStore } from './groupStore';

import Register from 'src/models/users/register';
import Token from 'src/models/users/token';
import Login from 'src/models/users/login';
import User from 'src/models/users/user';

export const useAuthenticationStore = defineStore('auth', () => {
  const state: AuthenticationState = reactive({
    currentUser: null,
    status: 'init',
    errors: [],
  });

  const groupStore = useGroupStore();

  const getCurrentUser = computed(() => state.currentUser);
  const isLoading = computed(() => state.status === 'pending');
  const isUserAuthenticated = computed(
    () => state.currentUser && state.status === 'success'
  );

  function markInit(): void {
    state.currentUser = null;
    state.status = 'init';
    state.errors = [];
  }

  function markAuthStart(): void {
    state.status = 'pending';
    state.errors = [];
  }

  function markAuthSuccess(currentUser: User | null): void {
    state.status = 'success';
    state.currentUser = currentUser;
  }

  function markAuthFailure(errors: []): void {
    state.status = 'error';
    state.errors = errors;
  }

  async function verifyAndGetCurrentUser(): Promise<boolean> {
    try {
      markAuthStart();
      const currentUser = await authService.getCurrentUser();

      if (currentUser?.id !== state.currentUser?.id) {
        for (const group of currentUser.groups) {
          await groupStore.subscribeToGroupSocket(group.name);
          groupStore.insertNewGroup({ ...group });
        }
      }

      markAuthSuccess(currentUser);

      return state.currentUser !== null;
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  async function loginUser(login: Login): Promise<Token> {
    try {
      markAuthStart();
      const loginToken = await authService.loginUser(login);
      markAuthSuccess(null);

      authManager.setToken(loginToken.token);
      return loginToken;
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  async function registerUser(register: Register): Promise<User> {
    try {
      markAuthStart();
      const currentUser = await authService.registerUser(register);

      const login: Login = {
        email: register.email,
        password: register.password,
        rememberMe: true,
      };

      const loginToken = await authService.loginUser(login);
      markAuthSuccess(currentUser);

      authManager.setToken(loginToken.token);
      return currentUser;
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  async function logoutUser(): Promise<void> {
    try {
      markAuthStart();
      await authService.logoutUser();
      await groupStore.unsubscribeFromAllGroupSockets();
      markInit();

      authManager.removeToken();
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  return {
    state,
    getCurrentUser,
    isUserAuthenticated,
    isLoading,
    verifyAndGetCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
  };
});

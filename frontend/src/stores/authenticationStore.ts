import { defineStore } from 'pinia';

import { reactive, computed } from 'vue';

import AuthenticationState from 'src/models/users/authenticationState';
import authManager from 'src/api/managers/authManager';
import authService from 'src/api/services/authService';
import commonService from 'src/api/services/commonService';
import { useGroupStore } from './groupStore';
import { useCommandLineStore } from './cmdStore';

import Register from 'src/models/users/register';
import Token from 'src/models/users/token';
import Login from 'src/models/users/login';
import { User } from 'src/models/users/user';

export const useAuthenticationStore = defineStore('auth', () => {
  const state: AuthenticationState = reactive({
    currentUser: null,
    status: 'init',
    errors: [],
  });

  const groupStore = useGroupStore();
  const cmdStore = useCommandLineStore();

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

    if (state.currentUser) state.currentUser.status = 'ONLINE';
  }

  function markAuthFailure(errors: []): void {
    state.status = 'error';
    state.errors = errors;
  }

  function setStatusOfUser(status: string): void {
    state.currentUser.status = status;
  }

  async function verifyAndGetCurrentUser(): Promise<boolean> {
    try {
      markAuthStart();
      const currentUser = await authService.getCurrentUser();

      if (currentUser?.id !== state.currentUser?.id) {
        commonService.subscribeToCommonSocket();

        for (const group of currentUser.groups) {
          await groupStore.subscribeToGroupSocket(group.name);
          groupStore.insertNewGroup({ ...group });
        }
      }

      markAuthSuccess(currentUser);

      return state.currentUser !== null;
    } catch (errors: any) {
      markAuthFailure(errors as []);
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
      commonService.subscribeToCommonSocket();

      return currentUser;
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  async function logoutUser(): Promise<void> {
    try {
      markAuthStart();
      if (cmdStore.commandLineInput) {
        cmdStore.clearCommandLineInput();
        await groupStore.userStoppedTyping(state.currentUser.nickname);
      }

      groupStore.changeActiveGroup();

      await authService.logoutUser();

      commonService.unsubscribeFromCommonSocket();
      groupStore.unsubscribeFromAllGroupSockets();
      markInit();

      authManager.removeToken();
    } catch (errors: any) {
      markAuthFailure(errors as []);
      throw errors;
    }
  }

  return {
    state,
    setStatusOfUser,
    getCurrentUser,
    isUserAuthenticated,
    isLoading,
    verifyAndGetCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
  };
});

import { defineStore } from 'pinia';
import User from 'src/models/users/user';

export const useUserStore = defineStore('users', {
  state: () => ({
    current: {
      nickname: 'Nickname',
      name: 'Firstname',
      email: 'Email',
      color: 'bg-blue-7',
    },
  }),
  getters: {
    getCurrentUser: (state): User => state.current,
  },
  actions: {},
});

import { defineStore } from 'pinia';

export const useStatusStore = defineStore('states', {
  state: () => ({
    states: {
      online: {
        name: 'Online',
        color: 'green',
      },
      offline: {
        name: 'Offline',
        color: 'grey',
      },
      dnd: {
        name: 'DND',
        color: 'red',
      },
    },
  }),
  getters: {},
  actions: {},
});

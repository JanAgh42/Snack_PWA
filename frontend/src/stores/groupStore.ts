import { defineStore } from 'pinia';

export const useGroupStore = defineStore('groups', {
  state: () => ({
    chosenGroup: '',
  }),
  getters: {
    getChosenGroup: (state) => state.chosenGroup,
  },
  actions: {
    changeChosenGroup(group: string): void {
      this.chosenGroup = group;
    },
  },
});

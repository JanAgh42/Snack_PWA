import { defineStore } from 'pinia';

export const useInitialNavbarStore = defineStore('initial', {
  state: () => ({
    isInitial: true,
  }),
  getters: {
    checkIfInitial: (state) => state.isInitial,
  },
  actions: {
    initial_page_changed(value: boolean): void {
      this.isInitial = value;
    },
  },
});

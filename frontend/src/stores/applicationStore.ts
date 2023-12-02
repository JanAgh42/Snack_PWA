import { defineStore } from 'pinia';

export const useApplicationStore = defineStore('app', {
  state: () => ({
    usersDrawer: false,
    chosenAppPage: '',
    addGroupModalVisibility: false,
  }),
  getters: {
    getUsersDrawer: (state) => state.usersDrawer,
    getChosenAppPage: (state) => state.chosenAppPage,
    getAddGroupModal: (state) => state.addGroupModalVisibility,
  },
  actions: {
    usersDrawerVisible(): void {
      this.usersDrawer = !this.usersDrawer;
    },
    changeAppPage(page: string): void {
      this.chosenAppPage = page;
    },
    changeAddGroupModal(): void {
      this.addGroupModalVisibility = !this.addGroupModalVisibility;
      console.log(this.addGroupModalVisibility);
    },
  },
});

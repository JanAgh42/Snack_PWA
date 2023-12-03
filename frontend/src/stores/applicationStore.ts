import { defineStore } from 'pinia';

import { ref, computed } from 'vue';

export const useApplicationStore = defineStore('app', () => {
  let usersDrawer = ref(false);
  let chosenAppPage = ref('');
  let addGroupModalVisibility = ref(false);

  const getUsersDrawer = computed(() => usersDrawer.value);
  const getChosenAppPage = computed(() => chosenAppPage.value);
  const getAddGroupModal = computed(() => addGroupModalVisibility.value);

  function usersDrawerVisible(): void {
    usersDrawer.value = !usersDrawer.value;
  }

  function changeAppPage(page: string): void {
    chosenAppPage.value = page;
  }

  function changeAddGroupModal(): void {
    addGroupModalVisibility.value = !addGroupModalVisibility.value;
  }

  return {
    usersDrawer,
    chosenAppPage,
    addGroupModalVisibility,
    getUsersDrawer,
    getChosenAppPage,
    getAddGroupModal,
    usersDrawerVisible,
    changeAppPage,
    changeAddGroupModal,
  };
});

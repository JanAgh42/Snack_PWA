import { defineStore } from 'pinia';

import { ref, computed } from 'vue';

export const useApplicationStore = defineStore('app', () => {
  const usersDrawer = ref(false);
  const chosenAppPage = ref('');
  const addGroupModalVisibility = ref(false);
  const leaveGroupModalVisibility = ref(false);
  const logoutModalVisibility = ref(false);

  const getUsersDrawer = computed(() => usersDrawer.value);
  const getChosenAppPage = computed(() => chosenAppPage.value);
  const getAddGroupModal = computed(() => addGroupModalVisibility.value);
  const getLeaveGroupModal = computed(() => leaveGroupModalVisibility.value);
  const getLogoutModal = computed(() => logoutModalVisibility.value);

  function usersDrawerVisible(): void {
    usersDrawer.value = !usersDrawer.value;
  }

  function changeAppPage(page: string): void {
    chosenAppPage.value = page;
  }

  function toggleAddGroupModal(): void {
    addGroupModalVisibility.value = !addGroupModalVisibility.value;
  }

  function toggleLeaveGroupModal(): void {
    leaveGroupModalVisibility.value = !leaveGroupModalVisibility.value;
  }

  function toggleLogoutModal(): void {
    logoutModalVisibility.value = !logoutModalVisibility.value;
  }

  return {
    usersDrawer,
    chosenAppPage,
    addGroupModalVisibility,
    leaveGroupModalVisibility,
    logoutModalVisibility,
    getUsersDrawer,
    getChosenAppPage,
    getAddGroupModal,
    getLeaveGroupModal,
    getLogoutModal,
    usersDrawerVisible,
    changeAppPage,
    toggleAddGroupModal,
    toggleLeaveGroupModal,
    toggleLogoutModal,
  };
});

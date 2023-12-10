import { defineStore } from 'pinia';

import { ref, computed } from 'vue';

export const useApplicationStore = defineStore('app', () => {
  const usersDrawer = ref(false);
  const addGroupModalVisibility = ref(false);
  const leaveGroupModalVisibility = ref(false);
  const logoutModalVisibility = ref(false);
  const groupMembersModalVisibility = ref(false);

  const groupNameForModal = ref('');
  const chosenAppPage = ref('');

  const getUsersDrawer = computed(() => usersDrawer.value);
  const getChosenAppPage = computed(() => chosenAppPage.value);
  const getAppPageRef = computed(() => chosenAppPage);
  const getAddGroupModal = computed(() => addGroupModalVisibility.value);
  const getLeaveGroupModal = computed(() => leaveGroupModalVisibility.value);
  const getLogoutModal = computed(() => logoutModalVisibility.value);
  const getGroupNameForModal = computed(() => groupNameForModal.value);
  const getGroupMembersModal = computed(
    () => groupMembersModalVisibility.value
  );

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

  function toggleGroupMembersModal(): void {
    groupMembersModalVisibility.value = !groupMembersModalVisibility.value;
  }

  function setGroupNameForModal(groupName: string): void {
    groupNameForModal.value = groupName;
  }

  return {
    getGroupNameForModal,
    setGroupNameForModal,
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
    getGroupMembersModal,
    getAppPageRef,
    usersDrawerVisible,
    changeAppPage,
    toggleAddGroupModal,
    toggleLeaveGroupModal,
    toggleLogoutModal,
    toggleGroupMembersModal,
  };
});

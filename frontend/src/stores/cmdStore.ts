import { defineStore } from 'pinia';

import { ref, computed } from 'vue';

export const useCommandLineStore = defineStore('cmd', () => {
  const commandLineInput = ref('');
  const userToAddress = ref(null);

  const getCommandLineInput = computed(() => commandLineInput);
  const getUserToAddress = computed(() => userToAddress);

  function clearCommandLineInput(): void {
    commandLineInput.value = '';
  }

  function setUserToAddress(nickname: string | null): void {
    userToAddress.value = nickname;
  }

  return {
    userToAddress,
    commandLineInput,
    getCommandLineInput,
    getUserToAddress,
    clearCommandLineInput,
    setUserToAddress,
  };
});

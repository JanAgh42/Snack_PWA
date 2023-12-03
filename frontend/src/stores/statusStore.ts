import { defineStore } from 'pinia';

import { reactive } from 'vue';

export const useStatusStore = defineStore('states', () => {
  const states = reactive({
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
  });

  return {
    states,
  };
});

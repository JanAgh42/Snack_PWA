<template>
  <q-page class="col row max-width">
    <groups-list />
    <group-chat />
    <users-list v-if="$q.screen.width > 1024" />
    <q-drawer
      v-else
      side="right"
      v-model="appStore.usersDrawer"
      overlay
      class="bkg-secondary"
    >
      <users-list />
    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import { useApplicationStore } from '../stores/applicationStore';
import GroupsList from '../components/groups/GroupsList.vue';
import UsersList from '../components/users/UsersList.vue';
import GroupChat from '../components/messages/GroupChat.vue';
import { onMounted } from 'vue';

const appStore = useApplicationStore();

onMounted(() => (appStore.chosenAppPage = ''));
</script>

<style scoped lang="scss">
.max-width {
  display: grid;
  grid-template-columns: 300px 1fr 300px;
}

@media (max-width: $breakpoint-index) {
  .max-width {
    grid-template-columns: 300px 1fr 1px;
  }
}
</style>

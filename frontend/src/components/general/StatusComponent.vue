<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar
        :class="currentUser.color"
        class="cursor-pointer"
        size="md"
        @click="showProfile"
        >{{ currentUser.nickname.slice(0, 2).toUpperCase() }}</q-avatar
      >
    </q-item-section>
    <q-item-section>
      <q-item-label class="truncate full-width nickname-color"
        >{{ currentUser.nickname }}
      </q-item-label>
      <q-item-label caption class="real-name-color truncate full-width"
        >{{ currentUser.firstname }} {{ currentUser.lastname }}</q-item-label
      >
    </q-item-section>
    <q-item-section side top>
      <q-item-label :style="{ color: userStatus.color }" caption>{{
        userStatus.name
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { useStatusStore } from 'src/stores/status-store';
import { useApplicationStore } from 'src/stores/application-store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const statusStore = useStatusStore();
const appStore = useApplicationStore();

const currentUser = computed(() => userStore.getCurrentUser);
const userStatus = computed(() => statusStore.states.online);

function showProfile(): void {
  appStore.changeAppPage('/profile');
  router.push('/app/profile');
}
</script>

<style scoped lang="scss">
.real-name-color {
  color: $darker;
}

.full-width {
  max-width: 150px;
}
</style>

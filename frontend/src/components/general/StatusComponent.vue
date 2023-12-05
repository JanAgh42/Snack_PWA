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
      <q-item-label class="truncate full-width"
        >{{ currentUser.nickname }}
      </q-item-label>
      <q-item-label caption class="real-name-color truncate full-width">{{
        currentUser.name
      }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label :style="{ color: userStatus.color }" caption>{{
        userStatus.name
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useStatusStore } from 'src/stores/statusStore';
import { useApplicationStore } from 'src/stores/applicationStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const authStore = useAuthenticationStore();
const statusStore = useStatusStore();
const appStore = useApplicationStore();

const currentUser = computed(() => authStore.getCurrentUser);
const userStatus = computed(() => statusStore.states.online);

function showProfile(): void {
  appStore.changeAppPage('/profile');
  router.push({ name: 'Profile' });
}
</script>

<style scoped lang="scss">
.full-width {
  max-width: 150px;
}
</style>

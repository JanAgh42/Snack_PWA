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
      <q-item-label caption>
        <q-btn
          class="status-button"
          :style="{ color: statusColor, width: '45px' }"
          @click="changeStatus"
          dense
          flat
        >
          {{ statusValue.toLowerCase() }}
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useApplicationStore } from 'src/stores/applicationStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useGroupStore } from 'src/stores/groupStore';
import { statusKeys, statusValues } from 'src/enums/statuses';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const authStore = useAuthenticationStore();
const appStore = useApplicationStore();
const groupStore = useGroupStore();

const currentUser = computed(() => authStore.getCurrentUser);

const statusValue = computed(() => {
  const valueIndex = statusKeys.indexOf(authStore.getCurrentUser.status);

  return valueIndex > -1 ? authStore.getCurrentUser.status : statusKeys[0];
});

const statusColor = computed(() => {
  const valueIndex = statusKeys.indexOf(authStore.getCurrentUser.status);

  return valueIndex > -1
    ? statusValues[valueIndex].toString()
    : statusValues[0].toString();
});

function showProfile(): void {
  appStore.changeAppPage('/profile');
  router.push({ name: 'Profile' });
}

async function changeStatus(): Promise<void> {
  const valueIndex = statusKeys.indexOf(authStore.getCurrentUser.status);

  authStore.setStatusOfUser(
    valueIndex === statusKeys.length - 1
      ? statusKeys[0]
      : statusKeys[valueIndex + 1]
  );

  await groupStore.userChangedStatus(
    authStore.getCurrentUser.nickname,
    authStore.getCurrentUser.status
  );
}
</script>

<style scoped lang="scss">
.full-width {
  max-width: 150px;
}

.status-button {
  font-size: 10px;
}
</style>

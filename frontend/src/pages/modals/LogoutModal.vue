<template>
  <q-dialog v-model="appStore.getLogoutModal">
    <q-card style="min-width: 350px" class="bkg-active">
      <q-card-section>
        <div class="text-h6">Log out</div>
      </q-card-section>

      <q-card-section class="q-pt-none column items-center">
        Are you sure you want to log out?
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Log out"
          class="modal-button-color"
          @click="logoutUser"
          :loading="authStore.state.status === 'pending'"
        />
        <q-btn
          flat
          label="Cancel"
          class="modal-button-color"
          @click="appStore.toggleLogoutModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useApplicationStore } from '../../stores/applicationStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useApplicationStore();
const authStore = useAuthenticationStore();

async function logoutUser(): Promise<void> {
  await authStore.logoutUser();

  if (authStore.state.errors.length !== 0) return;

  appStore.toggleLogoutModal();
  router.push({ name: 'Main' });
}
</script>

<style scoped lang="scss">
.modal-button-color {
  color: $grey-4;
}
</style>

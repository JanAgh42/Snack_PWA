<template>
  <q-dialog v-model="appStore.getLeaveGroupModal">
    <q-card style="min-width: 350px" class="bkg-active">
      <q-card-section>
        <div class="text-h6">Leave group</div>
      </q-card-section>

      <q-card-section class="q-pt-none column items-center">
        Are you sure you want to leave this group?
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Leave group"
          class="modal-button-color"
          @click="leaveGroup"
          :loading="groupStore.state.isLoading"
        />
        <q-btn
          flat
          label="Cancel"
          class="modal-button-color"
          @click="appStore.toggleLeaveGroupModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useApplicationStore } from '../../stores/applicationStore';
import { useGroupStore } from 'src/stores/groupStore';

const appStore = useApplicationStore();
const groupStore = useGroupStore();
const authStore = useAuthenticationStore();

async function leaveGroup(): Promise<void> {
  await groupStore.removeMyselfFromGroup(authStore.getCurrentUser.id);

  if (groupStore.state.error) return;

  appStore.toggleLeaveGroupModal();
}
</script>

<style scoped lang="scss">
.modal-button-color {
  color: $grey-4;
}
</style>

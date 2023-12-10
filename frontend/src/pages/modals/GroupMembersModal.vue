<template>
  <q-dialog v-model="appStore.getGroupMembersModal">
    <q-card style="min-width: 350px" class="bkg-active">
      <q-card-section>
        <div class="text-h6">{{ appStore.getGroupNameForModal }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none column items-center max-height">
        <q-virtual-scroll
          :items="groupUsers"
          separator
          v-slot="{ item }"
          class="q-mt-sm"
        >
          <user-entry :member="item" :group-owner="0" />
        </q-virtual-scroll>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancel"
          class="modal-button-color"
          @click="appStore.toggleGroupMembersModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useApplicationStore } from '../../stores/applicationStore';
import { useGroupStore } from '../../stores/groupStore';
import UserEntry from 'src/components/users/UserEntry.vue';

const appStore = useApplicationStore();
const groupStore = useGroupStore();

const groupUsers = computed(
  () => groupStore.state.groupUsers[appStore.getGroupNameForModal]
);
</script>

<style scoped lang="scss">
.modal-button-color {
  color: $grey-4;
}

.max-height {
  overflow: auto;
  min-height: 300px;
  max-height: 300px;
}
</style>

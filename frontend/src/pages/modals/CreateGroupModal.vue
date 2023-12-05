<template>
  <q-dialog v-model="appStore.getAddGroupModal">
    <q-card style="min-width: 350px" class="bkg-active">
      <q-card-section>
        <div class="text-h6">Create a new group</div>
      </q-card-section>

      <q-card-section class="q-pt-none column items-center">
        <q-input
          dense
          v-model="newGroup.name"
          label="Group name"
          label-color="grey-6"
          autofocus
          borderless
          :input-style="{ color: 'rgb(190, 190, 190)' }"
          class="modal-input-border input-min-width"
        />
        <q-toggle
          label="Private"
          class="q-mt-md"
          v-model="newGroup.isPrivate"
          color="indigo-4"
          keep-color
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Create group"
          class="modal-button-color"
          @click="createNewGroup"
          :loading="groupStore.state.isLoading"
        />
        <q-btn
          flat
          label="Cancel"
          class="modal-button-color"
          @click="appStore.toggleAddGroupModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useApplicationStore } from '../../stores/applicationStore';
import { useGroupStore } from 'src/stores/groupStore';
import { colorValues } from 'src/enums/colors';
import Group from 'src/models/users/group';

const appStore = useApplicationStore();
const groupStore = useGroupStore();

const newGroup: Group = reactive({
  name: '',
  isPrivate: false,
  color: '',
});

async function createNewGroup(): Promise<void> {
  newGroup.color = colorValues[Math.floor(Math.random() * colorValues.length)];

  await groupStore.createNewGroup(newGroup);

  if (groupStore.state.error) return;

  appStore.toggleAddGroupModal();
}
</script>

<style scoped lang="scss">
.modal-input-border {
  border-bottom: 1px solid $grey-5;
}

.modal-button-color {
  color: $grey-4;
}

.input-min-width {
  min-width: 250px;
}
</style>

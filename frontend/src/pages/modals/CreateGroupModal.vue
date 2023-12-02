<template>
  <q-dialog v-model="appStore.addGroupModalVisibility">
    <q-card style="min-width: 350px" class="bkg-active">
      <q-card-section>
        <div class="text-h6">Create a new group</div>
      </q-card-section>

      <q-card-section class="q-pt-none column items-center">
        <q-input
          dense
          v-model="groupName"
          label="Group name"
          label-color="grey-6"
          autofocus
          borderless
          @keyup.enter="appStore.addGroupModalVisibility = false"
          :input-style="{ color: 'rgb(190, 190, 190)' }"
          class="modal-input-border input-min-width"
        />
        <q-toggle
          label="Private"
          class="q-mt-md"
          v-model="isPrivate"
          color="indigo-4"
          keep-color
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" class="modal-button-color" v-close-popup />
        <q-btn
          flat
          label="Create group"
          class="modal-button-color"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApplicationStore } from '../../stores/applicationStore';

const appStore = useApplicationStore();

let groupName = ref('');
let isPrivate = ref(false);
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

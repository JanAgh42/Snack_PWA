<template>
  <section class="grouplist-border column">
    <article class="q-px-lg q-pt-lg">
      <div class="row justify-between">
        <h6 class="q-mb-sm">Groups</h6>
        <q-btn flat dense icon="add" @click="appStore.toggleAddGroupModal" />
      </div>
      <search-component @captureSearchQuery="processQuery" />
      <template v-if="groupsList.length > 0">
        <q-virtual-scroll
          :items="groupsList"
          separator
          v-slot="{ item }"
          class="q-mt-sm scroll-size hide-list-scrollbar"
        >
          <group-entry :group="item" />
        </q-virtual-scroll>
      </template>
      <template v-else>
        <q-item class="q-mt-sm q-pt-lg scroll-size text-center">
          <q-item-label class="max-width"> Empty list </q-item-label>
        </q-item>
      </template>
    </article>
    <article class="bkg-primary flex-grow-1">
      <status-component />
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useApplicationStore } from 'src/stores/applicationStore';
import { useGroupStore } from 'src/stores/groupStore';
import SearchComponent from '../general/SearchComponent.vue';
import StatusComponent from '../general/StatusComponent.vue';
import GroupEntry from './GroupEntry.vue';

const appStore = useApplicationStore();
const groupStore = useGroupStore();

let search = ref('');

let groupsList = computed(() =>
  search.value
    ? groupStore.state.groups.filter((group) =>
        group.name.toLowerCase().includes(search.value.toLowerCase())
      )
    : groupStore.state.groups
);

function processQuery(value: string): void {
  search.value = value;
}
</script>

<style scoped lang="scss">
.height {
  bottom: 0;
}

.grouplist-border {
  border-right: 2px solid $primary;
}

.max-width {
  min-width: 100%;
}
</style>

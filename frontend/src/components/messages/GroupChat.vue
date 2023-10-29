<template>
  <article v-if="store.getChosenGroup" class="q-pt-lg column">
    <h6 class="q-pb-sm q-pl-lg group-name-border">
      {{ store.getChosenGroup }}
    </h6>
    <q-infinite-scroll
      @load="onLoad"
      :offset="1000"
      :debounce="200"
      class="scroll-size overflow-auto q-mx-lg track"
      reverse
    >
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-hourglass color="primary" name="dots" size="50px" />
        </div>
      </template>

      <template v-for="(item, index) in items" :key="index">
        <group-message />
      </template>
    </q-infinite-scroll>
  </article>
  <article
    v-else
    class="column scroll-size justify-center items-center text-h6"
  >
    No group selected
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGroupStore } from '../../stores/group-store';
import GroupMessage from './GroupMessage.vue';

const store = useGroupStore();

const items = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

function onLoad(index: any, done: any) {
  setTimeout(() => {
    items.value.splice(0, 0, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});
    done();
  }, 2000);
}
</script>

<style scoped lang="scss">
.scroll-size {
  max-height: calc(100vh - 180px);
  min-height: calc(100vh - 180px);
}

.group-name-border {
  border-bottom: 2px solid $primary;
}

.track::-webkit-scrollbar-track {
  background: $intermediate;
}
</style>

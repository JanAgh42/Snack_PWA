<template>
  <article class="userlist-border q-pl-md q-pt-lg">
    <h6 class="q-mb-sm">Group members</h6>
    <div id="virtual-scroll-target" :style="style" class="height" ref="target">
      <q-virtual-scroll
        :items="groupStore.getUsersOfActiveGroup"
        separator
        v-slot="{ item }"
        class="q-mt-sm"
        scroll-target="#virtual-scroll-target"
      >
        <user-entry
          :member="item"
          :group-owner="groupStore.getActiveGroup.ownerId"
        />
      </q-virtual-scroll>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useGroupStore } from 'src/stores/groupStore';
import UserEntry from './UserEntry.vue';

const groupStore = useGroupStore();

let target = ref(null);

let style = reactive({
  maxHeight: '0px',
});

const calculateHeight = () => {
  if (target.value) {
    style.maxHeight = `${
      window.innerHeight - target.value.getBoundingClientRect().top - 1
    }px`;
  }
};

onMounted(() => {
  calculateHeight();
  window.addEventListener('resize', calculateHeight);
});

onUnmounted(() => window.removeEventListener('resize', calculateHeight));
</script>

<style scoped lang="scss">
.userlist-border {
  border-left: 2px solid $primary;
}
</style>

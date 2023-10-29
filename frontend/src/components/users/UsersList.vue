<template>
  <article class="userlist-border q-pl-md q-pt-lg">
    <h6 class="q-mb-sm">Group members</h6>
    <div id="virtual-scroll-target" :style="style" class="height" ref="target">
      <q-virtual-scroll
        :items="groupMembersList"
        separator
        v-slot="{ item }"
        class="q-mt-sm"
        scroll-target="#virtual-scroll-target"
      >
        <user-entry :member="item" :status="statusStore.states.offline" />
      </q-virtual-scroll>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useStatusStore } from 'src/stores/status-store';
import UserEntry from './UserEntry.vue';

const statusStore = useStatusStore();

let target = ref(null);

let style = reactive({
  maxHeight: '0px',
});

let groupMembersList = [
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
  {
    name: 'FirstMember',
    color: 'bg-indigo-7',
  },
  {
    name: 'SecondMember',
    color: 'bg-green-7',
  },
  {
    name: 'ThirdMember',
    color: 'bg-red-7',
  },
];

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

.height {
  overflow-y: auto;
}
</style>

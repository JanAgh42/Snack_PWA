<template>
  <article v-if="groupStore.getActiveGroup" class="column">
    <section class="row justify-between group-name-border q-mt-md q-pb-sm">
      <div class="min-width">
        <p class="q-pl-lg q-mb-none real-name-color small-line-height">
          {{ groupStore.getActiveGroup?.isPrivate ? 'private' : 'public' }}
        </p>
        <h6 class="q-pl-lg small-line-height truncate">
          {{ groupStore.getActiveGroup.name }}
        </h6>
      </div>
      <q-btn
        flat
        dense
        class="q-mr-md real-name-color text-capitalize"
        @click="appStore.toggleLeaveGroupModal"
        >Leave</q-btn
      >
    </section>
    <q-infinite-scroll
      @load="triggerLoad"
      :offset="300"
      class="scroll-size overflow-auto q-mx-lg track"
      reverse
    >
      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-hourglass color="primary" name="dots" size="50px" />
        </div>
      </template>

      <template v-for="message in messageList" :key="message.id.toString()">
        <group-message :message="message" />
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
import { computed } from 'vue';
import { useGroupStore } from '../../stores/groupStore';
import { useApplicationStore } from 'src/stores/applicationStore';
import GroupMessage from './GroupMessage.vue';
import { Message, TypedMessage } from 'src/models/users/message';

const appStore = useApplicationStore();
const groupStore = useGroupStore();

const messageList = computed(() =>
  groupStore.getTypedOfActiveGroup
    ? ([].concat(
        groupStore.getMessagesOfActiveGroup,
        groupStore.getTypedOfActiveGroup
      ) as (Message | TypedMessage)[])
    : groupStore.getMessagesOfActiveGroup
);

function triggerLoad(index: any, done: any) {
  setTimeout(() => {
    (async () => await groupStore.loadAnotherGroupOfMessages())();
    done();
  }, 2000);
}
</script>

<style scoped lang="scss">
.small-line-height {
  line-height: normal;
}

.scroll-size {
  max-height: calc(100vh - 180px);
  min-height: calc(100vh - 180px);
}

.group-name-border {
  border-bottom: 2px solid $primary;
}

.min-width {
  flex: 1;
  min-width: 0;
}

.track::-webkit-scrollbar-track {
  background: $intermediate;
}
</style>

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
    <div class="scroll-size overflow-auto q-mx-lg track" ref="infiniteScroll">
      <template v-for="message in messageList" :key="message.id.toString()">
        <group-message :message="message" />
      </template>
      <div class="row justify-center q-my-md">
        <q-spinner-hourglass
          color="primary"
          name="dots"
          size="50px"
          v-if="
            lastAmountOfMessages > 0 &&
            groupStore.getMessagesOfActiveGroup.length >= 20
          "
        />
        <h6 v-else>Beginning of conversation</h6>
      </div>
    </div>
  </article>
  <article
    v-else
    class="column scroll-size justify-center items-center text-h6"
  >
    No group selected
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, onUpdated } from 'vue';
import { useGroupStore } from '../../stores/groupStore';
import { useApplicationStore } from 'src/stores/applicationStore';
import GroupMessage from './GroupMessage.vue';
import { Message, TypedMessage } from 'src/models/users/message';

const appStore = useApplicationStore();
const groupStore = useGroupStore();

const infiniteScroll = ref(null);

let previousGroupName = ref('');
let lastAmountOfMessages = ref(20);
let isLoading = ref(false);

const messageList = computed(() =>
  groupStore.getTypedOfActiveGroup
    ? ([]
        .concat(
          groupStore.getMessagesOfActiveGroup,
          groupStore.getTypedOfActiveGroup
        )
        .toReversed() as (Message | TypedMessage)[])
    : groupStore.getMessagesOfActiveGroup.toReversed()
);

function triggerLoad() {
  setTimeout(() => {
    (async () => {
      lastAmountOfMessages.value =
        await groupStore.loadAnotherGroupOfMessages();
      isLoading.value = false;
    })();
  }, 300);
}

function handleInfiniteScroll(): void {
  if (
    lastAmountOfMessages.value > 0 &&
    !isLoading.value &&
    infiniteScroll.value &&
    infiniteScroll.value.scrollTop - 300 <
      infiniteScroll.value.clientHeight - infiniteScroll.value.scrollHeight
  ) {
    isLoading.value = true;
    triggerLoad();
  }
}

onUpdated(() => {
  if (previousGroupName.value === groupStore.getActiveGroup?.name) return;

  lastAmountOfMessages.value = 20;
  previousGroupName.value = groupStore.getActiveGroup?.name;
});

onMounted(() => {
  const interval = setInterval(() => {
    if (infiniteScroll.value) {
      infiniteScroll.value.addEventListener('scroll', handleInfiniteScroll);
      infiniteScroll.value.scrollTop = 0;
      clearInterval(interval);
    }
  }, 50);
});

onBeforeUnmount(() => {
  infiniteScroll.value.removeEventListener('scroll', handleInfiniteScroll);
});
</script>

<style scoped lang="scss">
.small-line-height {
  line-height: normal;
}

.scroll-size {
  max-height: calc(100vh - 180px);
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column-reverse;
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

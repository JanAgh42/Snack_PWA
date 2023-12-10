<template>
  <article
    class="q-py-sm row message"
    :class="[
      myReference || isTyping ? 'bright-background' : '',
      isTyping ? 'cursor-pointer' : '',
    ]"
    @click="toggleShowTypings"
  >
    <q-item-section class="time-width" top>
      <div>
        <q-item-label class="time-color small-font" caption>{{
          date
        }}</q-item-label>
        <q-item-label
          class="time-color small-font"
          :style="{ marginTop: 0 }"
          caption
          >{{ time }}</q-item-label
        >
      </div>
    </q-item-section>
    <q-item-section top>
      <q-item-label>
        <span
          class="text-weight-bold q-mr-sm"
          :class="
            isOwner
              ? 'owner-color'
              : isPastUser
              ? 'past-name-color'
              : 'name-color'
          "
          >{{
            'groupId' in props.message
              ? props.message.author.nickname
              : props.message.nickname
          }}</span
        >
        <span class="line-height word-wrap" v-if="showTypings">{{
          props.message.content
        }}</span>
        <span class="dots-anim" v-else-if="isTyping">is typing</span>
        <span
          class="line-height word-wrap message-content"
          :class="isPastUser ? 'past-name-color' : ''"
          v-html="messageContent"
          v-else
        ></span>
      </q-item-label>
    </q-item-section>
  </article>
</template>

<script setup lang="ts">
import format from 'date-fns/format';
import { ref, computed, onMounted } from 'vue';
import { Message, TypedMessage } from 'src/models/users/message';
import { useGroupStore } from 'src/stores/groupStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';

const props = defineProps<{
  message: Message | TypedMessage;
}>();

const groupStore = useGroupStore();
const authStore = useAuthenticationStore();

let isTyping = ref(false);
let showTypings = ref(false);
let myReference = ref(false);

let messageContent = ref('');

const isPastUser = computed(() =>
  'groupId' in props.message
    ? !groupStore.getUsersOfActiveGroup.some(
        (user) => user.id === (props.message as Message).userId
      )
    : false
);

const getOwnerName = computed(
  () =>
    groupStore.getUsersOfActiveGroup.find(
      (user) => user.id === groupStore.getActiveGroup.ownerId
    ).nickname
);

const isOwner = computed(
  () =>
    getOwnerName.value ===
    ('groupId' in props.message
      ? props.message.author.nickname
      : props.message.nickname)
);

const time = computed(
  () => `${format(new Date(props.message.createdAt), 'HH:mm')}`
);

const date = computed(
  () => `${format(new Date(props.message.createdAt), 'dd.MM.yyyy')}`
);

function toggleShowTypings() {
  if (!isTyping.value) return;

  showTypings.value = !showTypings.value;
}

function findUserReferences(): void {
  let messageParts = props.message.content.split(' ');

  const getGroupUsernames = groupStore.getUserNamesFromActiveGroup.map(
    (name) => `@${name}`
  );

  myReference.value = messageParts.some(
    (part) =>
      part.replace(/(^[,.:-?!]*)|([,.:-?!]*$)/g, '') ===
      `@${authStore.getCurrentUser.nickname}`
  );

  messageParts.forEach(
    (part, index) =>
      (messageParts[index] = getGroupUsernames.some(
        (name) => name === part.replace(/(^[,.:-?!]*)|([,.:-?!]*$)/g, '')
      )
        ? `<span>${part}</span>`
        : part)
  );

  messageContent.value = messageParts.join(' ');
}

onMounted(() => {
  isTyping.value = !('groupId' in props.message);

  if (!('groupId' in props.message)) return;

  findUserReferences();
});
</script>

<style scoped lang="scss">
.small-font {
  font-size: x-small;
}

.name-color {
  color: $grey-4;
}

.owner-color {
  color: rgb(93, 245, 166);
}

.message-content:deep(span) {
  color: rgb(93, 245, 166);
}

.past-name-color {
  color: $grey-7;
}

.time-color {
  color: $grey-7;
}

.height-auto {
  display: flex;
}

.bright-background {
  background-color: $ownmessage;
}

.line-height {
  line-height: 1.5;
}

.message {
  transition: height 0.3s;
}

.time-width {
  max-width: 60px;
}

.word-wrap {
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-word;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.dots-anim::after {
  animation: dots 1s linear infinite;
  content: '';
}

@keyframes dots {
  0%,
  20% {
    content: ' .';
  }
  35% {
    content: ' . .';
  }
  60% {
    content: ' . . .';
  }
  90%,
  100% {
    content: '';
  }
}
</style>

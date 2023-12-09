<template>
  <q-item
    @click="() => cmdStore.setUserToAddress(props.member.nickname)"
    clickable
  >
    <q-item-section class="avatar-width">
      <q-avatar :class="props.member.color" size="lg">{{
        props.member.nickname.slice(0, 2).toUpperCase()
      }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="truncate name-width">
        <span :style="{ color: getNicknameColor }">{{
          props.member.nickname
        }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label :style="{ color: props.status.color }" caption>{{
        props.status.name
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCommandLineStore } from 'src/stores/cmdStore';
import { GroupUser } from 'src/models/users/user';

const props = defineProps<{
  member: GroupUser;
  groupOwner: number;
  status: {
    name: string;
    color: string;
  };
}>();

const cmdStore = useCommandLineStore();

const getNicknameColor = computed(() =>
  props.member.id === props.groupOwner
    ? 'rgb(93, 245, 166)'
    : 'rgb(190, 190, 190)'
);
</script>

<style scoped lang="scss">
.name-width {
  min-width: 140px;
  max-width: 140px;
}

.avatar-width {
  min-width: 45px;
  max-width: 45px;
}

.type-height {
  min-height: 80px;
  max-height: 80px;
  overflow-y: auto;
}

.typing-color {
  color: $grey-7;
}

.type-color {
  color: $grey-5;
}

.hide-hint-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-hint-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

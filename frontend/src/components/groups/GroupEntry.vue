<template>
  <q-item
    clickable
    :active="groupStore.getChosenGroup?.name == props.group.name"
    active-class="active-color"
    @click="chooseGroup"
  >
    <q-item-section avatar>
      <q-avatar :class="group.color" rounded>{{
        props.group.name.charAt(0).toUpperCase()
      }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="truncate full-width">
        <span class="">{{ props.group.name }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useGroupStore } from '../../stores/groupStore';
import Group from 'src/models/users/group';

const props = defineProps<{
  group: Group;
}>();

const groupStore = useGroupStore();

function chooseGroup() {
  groupStore.changeActiveGroup(props.group.name);
}
</script>

<style scoped lang="scss">
.full-width {
  max-width: 135px;
}
</style>

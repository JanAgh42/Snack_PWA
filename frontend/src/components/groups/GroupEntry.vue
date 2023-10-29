<template>
  <q-item
    clickable
    :active="store.getChosenGroup == props.group.name"
    active-class="active-color"
    @click="chooseGroup"
  >
    <q-item-section avatar>
      <q-avatar :class="props.group.color" rounded>{{
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
import { useGroupStore } from '../../stores/group-store';

const props = defineProps(['group']);
const store = useGroupStore();

function chooseGroup() {
  store.changeChosenGroup(props.group.name);
}
</script>

<style scoped lang="scss">
.full-width {
  max-width: 135px;
}
</style>

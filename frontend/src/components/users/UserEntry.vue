<template>
  <q-item clickable>
    <q-item-section class="avatar-width">
      <q-avatar :class="props.member.color" size="md">{{
        props.member.name.slice(0, 2).toUpperCase()
      }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="truncate name-width">
        <span class="">{{ props.member.name }} aaaaaaaaaaaaaaaaa</span>
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
const props = defineProps(['member', 'status']);
</script>

<style scoped lang="scss">
.name-width {
  max-width: 140px;
}

.avatar-width {
  max-width: 35px;
}
</style>

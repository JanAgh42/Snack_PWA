<template>
  <div>
    <q-form>
      <q-input
        v-model="searchQuery"
        label="Find group..."
        label-color="grey-7"
        color="grey-7"
        class="outline q-px-sm bkg-primary rounded-borders"
        dense
        :input-style="{ color: 'rgb(149, 149, 149)' }"
        borderless
      >
        <q-icon name="search" class="full-height" size="22px" color="" />
      </q-input>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits(['captureSearchQuery']);

let searchQuery = ref('');

watch(searchQuery, () => emit('captureSearchQuery', searchQuery.value));
</script>

<style scoped lang="scss"></style>

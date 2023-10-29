<template>
  <section class="width rounded-borders">
    <q-input
      v-model="input"
      @keyup.enter="executeCommand"
      placeholder="Type your command..."
      class="rounded-borders q-px-md q-py-xs bkg-primary"
      :input-style="{ color: 'rgb(190, 190, 190)' }"
      borderless
      rounded
      dense
    >
      <q-icon
        name="send"
        class="full-height cursor-pointer"
        size="22px"
        color="white"
      />
    </q-input>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let input = ref('');

function executeCommand() {
  console.log(input);
}
</script>

<style scoped lang="scss">
.width {
  width: auto;
}
</style>

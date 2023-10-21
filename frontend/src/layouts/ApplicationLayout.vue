<template>
  <q-layout view="lHh Lpr lFf" class="bkg-secondary">
    <horizontal-navbar />
    <section class="row">
      <vertical-navbar />
      <q-page-container>
        <router-view />
      </q-page-container>
    </section>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VerticalNavbar from 'src/components/VerticalNavbar.vue';
import HorizontalNavbar from 'src/components/HorizontalNavbar.vue';
</script>

<style scoped lang="scss">
.max-height {
  height: 100vh;
}

.flex-col {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>

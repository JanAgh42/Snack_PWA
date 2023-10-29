<template>
  <q-layout view="lHh Lpr lFf" class="bkg">
    <initial-navbar />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer class="transparent align q-pa-sm text-indigo-4">
      &copy; Copyright 2023. All rights reserved.
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import InitialNavbar from '../components/navigation/InitialNavbar.vue';
</script>

<style lang="scss">
.bkg {
  background: $initial-grad-start;
  background: linear-gradient(
    0deg,
    $initial-grad-start 0%,
    $initial-grad-end 100%
  );
}

.align {
  text-align: center;
}
</style>

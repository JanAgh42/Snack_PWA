<template>
  <nav class="column bkg-primary max-height flex flex-col">
    <section class="bkg-primary flex column justify-center full-height">
      <q-item clickable class="q-px-md flex justify-center items-center">
        <q-icon name="o_home" size="22px" color="grey-5" />
      </q-item>
      <q-item clickable class="q-px-md flex justify-center items-center">
        <q-icon name="o_account_circle" size="22px" color="grey-5" />
      </q-item>
    </section>
    <q-item clickable class="q-px-md flex justify-center items-center">
      <q-icon name="o_settings" size="22px" color="grey-5" />
    </q-item>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
</script>

<template>
  <q-header class="row no-wrap no-shadow transparent">
    <template v-if="$router.currentRoute.value.path == '/'">
      <q-toolbar class="justify-end">
        <q-btn
          class="text-capitalize"
          color="indigo-7"
          text-color="lighter"
          icon-right="o_navigate_next"
          unelevated
          rounded
          @click="() => $router.push('/login')"
          >Log in</q-btn
        >
      </q-toolbar>
    </template>
    <template v-else>
      <q-toolbar class="justify-start">
        <q-btn
          class="text-capitalize"
          color="indigo-7"
          text-color="lighter"
          icon="o_navigate_before"
          unelevated
          rounded
          @click="() => $router.push('/')"
          >Go back</q-btn
        >
      </q-toolbar>
    </template>
  </q-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>

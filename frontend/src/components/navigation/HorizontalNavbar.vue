<template>
  <q-header class="row no-wrap no-shadow">
    <q-toolbar class="justify-center">
      <img src="../../assets/images/app_logo.png" alt="Snack logo" id="logo" />
      <q-btn
        v-if="store.getChosenAppPage == ''"
        flat
        @click="store.usersDrawerVisible"
        round
        dense
        icon="menu_open"
        class="absolute drawer-btn-visibility"
        color="grey-4"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useApplicationStore } from 'src/stores/application-store';

const store = useApplicationStore();
</script>

<style scoped lang="scss">
#logo {
  max-height: 20px;
  min-height: 20px;
}

.absolute {
  position: absolute;
  right: 10px;
}

.drawer-btn-visibility {
  display: none;
}

@media (max-width: $breakpoint-index) {
  .drawer-btn-visibility {
    display: inline;
  }
}
</style>

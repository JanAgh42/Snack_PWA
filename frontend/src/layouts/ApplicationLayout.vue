<template>
  <q-layout view="lHh Lpr lFf" class="bkg-secondary">
    <horizontal-navbar />
    <section class="row items-stretch">
      <vertical-navbar />
      <q-page-container class="col row">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </section>
    <command-line-component class="position" />
  </q-layout>
  <create-group-modal />
</template>

<script setup lang="ts">
import CreateGroupModal from '../pages/modals/CreateGroupModal.vue';
import VerticalNavbar from 'src/components/navigation/VerticalNavbar.vue';
import HorizontalNavbar from 'src/components/navigation/HorizontalNavbar.vue';
import CommandLineComponent from 'src/components/general/CommandLineComponent.vue';
</script>

<style scoped lang="scss">
.max-height {
  height: 100vh;
}

.flex-col {
  flex-direction: column;
  flex-wrap: nowrap;
}

.position {
  position: fixed;
  bottom: 20px;
  left: 400px;
  right: 350px;
}

@media (max-width: $breakpoint-index) {
  .position {
    right: 50px;
  }
}
</style>

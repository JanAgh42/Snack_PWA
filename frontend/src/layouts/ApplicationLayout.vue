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
    <transition name="fade" mode="out-in">
      <command-line-component class="position" ref="cmd" :style="style" />
    </transition>
  </q-layout>
  <create-group-modal />
  <leave-group-modal />
  <logout-modal />
  <group-members-modal />
</template>

<script setup lang="ts">
import CreateGroupModal from '../pages/modals/CreateGroupModal.vue';
import LeaveGroupModal from 'src/pages/modals/LeaveGroupModal.vue';
import LogoutModal from 'src/pages/modals/LogoutModal.vue';
import GroupMembersModal from 'src/pages/modals/GroupMembersModal.vue';
import VerticalNavbar from 'src/components/navigation/VerticalNavbar.vue';
import HorizontalNavbar from 'src/components/navigation/HorizontalNavbar.vue';
import CommandLineComponent from 'src/components/general/CommandLineComponent.vue';
import { useApplicationStore } from 'src/stores/applicationStore';
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue';

const appStore = useApplicationStore();

const cmd = ref(null);
const mediaQuery = window.matchMedia('(max-width: 1024px)');

let style = reactive({
  left: '400px',
  right: '350px',
});

function evaluateQuery(): void {
  if (mediaQuery.matches && appStore.getChosenAppPage === '') {
    style.left = '400px';
    style.right = '50px';
  } else if (mediaQuery.matches) {
    style.left = '100px';
    style.right = '50px';
  } else {
    style.left = '400px';
    style.right = '350px';
  }
}

watch(appStore.getAppPageRef, () => {
  evaluateQuery();
});

onMounted(() => {
  evaluateQuery();
  window.addEventListener('resize', evaluateQuery);
});

onUnmounted(() => {
  window.removeEventListener('resize', evaluateQuery);
});
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
  transition: left 0.3s, right 0.3s;
}
</style>

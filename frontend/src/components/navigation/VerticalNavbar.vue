<template>
  <nav class="column bkg-primary max-height flex flex-col">
    <section class="bkg-primary flex column justify-center full-height">
      <q-item
        clickable
        @click="switchPage('')"
        :active="store.getChosenAppPage == ''"
        active-class="active-color"
        class="q-px-md flex justify-center items-center"
      >
        <q-icon name="o_home" size="22px" color="grey-6" />
      </q-item>
      <q-item
        clickable
        @click="switchPage('/profile')"
        :active="store.getChosenAppPage == '/profile'"
        active-class="active-color"
        class="q-px-md flex justify-center items-center"
      >
        <q-icon name="o_account_circle" size="22px" color="grey-6" />
      </q-item>
    </section>
    <q-item
      clickable
      @click="switchPage('/settings')"
      :active="store.getChosenAppPage == '/settings'"
      active-class="active-color"
      class="q-px-md flex justify-center items-center"
    >
      <q-icon name="o_settings" size="22px" color="grey-6" />
    </q-item>
  </nav>
</template>

<script setup lang="ts">
import { useApplicationStore } from 'src/stores/applicationStore';
import { useRouter } from 'vue-router';

const store = useApplicationStore();
const router = useRouter();

function switchPage(name: string): void {
  store.changeAppPage(name);
  router.push({ path: `/app${store.getChosenAppPage}` });
}
</script>

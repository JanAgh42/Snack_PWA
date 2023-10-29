<template>
  <q-page class="row justify-center items-center" fullscreen>
    <div
      class="q-pa-lg bg glass-design rounded-borders column items-center shadow-4"
    >
      <div class="q-mb-md text-h6">Register</div>
      <q-form @submit="register" class="column items-center">
        <q-input
          v-model="name"
          label="Name"
          label-color="grey-7"
          type="text"
          class="input-min-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          dense
          borderless
        />
        <q-input
          v-model="nickname"
          label="Nickname"
          label-color="grey-7"
          type="text"
          class="q-mt-sm input-min-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          dense
          borderless
        />

        <q-input
          v-model="email"
          label="Email"
          label-color="grey-7"
          type="email"
          class="q-mt-sm input-min-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          dense
          borderless
        />

        <q-input
          v-model="password"
          label="Password"
          label-color="grey-7"
          type="password"
          class="q-mt-sm input-min-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          dense
          borderless
        />

        <q-input
          v-model="confirmPassword"
          label="Confirm password"
          label-color="grey-7"
          type="password"
          class="q-mt-sm q-mb-lg input-min-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          dense
          borderless
        />

        <q-btn
          type="submit"
          label="Create account"
          color="indigo-7"
          class="text-capitalize"
          @click="register"
          rounded
          push
        />
      </q-form>
      <div class="q-mt-md initial">
        <span>Already have an account? </span>
        <router-link to="/login">Log in!</router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useApplicationStore } from 'src/stores/application-store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const appStore = useApplicationStore();

let name = ref('');
let nickname = ref('');
let email = ref('');
let password = ref('');
let confirmPassword = ref('');

function register() {
  appStore.changeAppPage('');
  router.push({ name: 'Index' });
}
</script>

<style scoped lang="scss">
.input-min-width {
  min-width: 250px;
}
</style>

<template>
  <q-page class="row justify-center items-center" fullscreen>
    <div
      class="q-pa-lg bg glass-design rounded-borders column items-center shadow-4"
    >
      <div class="q-mb-md text-h6">Register</div>
      <q-form class="column items-center">
        <q-input
          v-model="register.name"
          label="Name"
          label-color="grey-7"
          type="text"
          class="input-min-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          dense
          borderless
        />
        <q-input
          v-model="register.nickname"
          label="Nickname"
          label-color="grey-7"
          type="text"
          class="q-mt-sm input-min-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          dense
          borderless
        />

        <q-input
          v-model="register.email"
          label="Email"
          label-color="grey-7"
          type="email"
          class="q-mt-sm input-min-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          dense
          borderless
        />

        <q-input
          v-model="register.password"
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
          :loading="registerLoading"
          @click="registerUser"
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
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';

import Register from 'src/models/users/register';

const router = useRouter();
const authStore = useAuthenticationStore();

const registerLoading = computed(() => authStore.status === 'pending');

const register: Register = reactive({
  name: '',
  nickname: '',
  email: '',
  password: '',
});

let confirmPassword = ref('');

async function registerUser(): Promise<void> {
  if (register.password !== confirmPassword.value) {
    return;
  }

  await authStore.registerUser(register);
  router.push({ name: 'Login' });
}
</script>

<style scoped lang="scss">
.input-min-width {
  min-width: 250px;
}
</style>

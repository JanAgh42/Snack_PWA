<template>
  <q-page class="row justify-center items-center" fullscreen>
    <div
      class="q-pa-lg bg glass-design rounded-borders column items-center shadow-4"
    >
      <div class="q-mb-md text-h6">Sign In</div>
      <q-form class="column items-center">
        <q-input
          v-model="login.email"
          label="Email"
          label-color="grey-7"
          type="email"
          class="input-min-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          dense
          borderless
        />

        <q-input
          v-model="login.password"
          label="Password"
          label-color="grey-7"
          type="password"
          class="q-mt-sm q-mb-md input-min-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          dense
          borderless
        />
        <q-toggle
          label="Remember me"
          class="q-mb-md"
          v-model="login.rememberMe"
          color="indigo-4"
          keep-color
        />

        <q-btn
          type="submit"
          label="Sign In"
          color="indigo-7"
          class="text-capitalize"
          :loading="loginLoading"
          @click="loginUser"
          rounded
          push
        />
        <div class="q-mt-md initial">
          <span>Don't have an account? </span>
          <router-link to="/register">Create one!</router-link>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useApplicationStore } from 'src/stores/applicationStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useRouter } from 'vue-router';

import Login from 'src/models/users/login';

const router = useRouter();
const appStore = useApplicationStore();
const authStore = useAuthenticationStore();

const loginLoading = computed(() => authStore.status === 'pending');

const login: Login = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

async function loginUser(): Promise<void> {
  const token = await authStore.loginUser(login);

  if (token === null) {
    return;
  }

  appStore.changeAppPage('');
  router.push({ name: 'Index' });
}
</script>

<style scoped lang="scss">
.input-min-width {
  min-width: 250px;
}

.border {
  border-bottom: 1px solid $initial-border !important;
}
</style>

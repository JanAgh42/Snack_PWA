<template>
  <q-page class="col row justify-center items-center" fullscreen>
    <div
      class="q-pa-lg bkg-primary rounded-borders column items-center profile-width"
    >
      <div class="q-mb-md text-h6">Profile</div>
      <q-form class="column items-center input-max-width">
        <q-input
          v-model="name"
          label="Name"
          label-color="grey-7"
          type="text"
          class="input-max-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          :disable="!isEditing"
          dense
          borderless
        />

        <q-input
          v-once
          v-model="currentUser.nickname"
          label="Nickname"
          label-color="grey-7"
          type="text"
          class="q-mt-sm input-max-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          disable
          dense
          borderless
        />

        <q-input
          v-once
          v-model="currentUser.email"
          label="Email"
          label-color="grey-7"
          type="email"
          class="q-mt-sm input-max-width border"
          :input-style="{ color: 'rgb(149, 149, 149)' }"
          disable
          dense
          borderless
        />
      </q-form>
      <div class="row q-mt-xl">
        <q-btn
          v-if="!isEditing"
          type="submit"
          label="Edit profile"
          color="indigo-7"
          class="text-capitalize q-mr-md rounded-borders"
          @click="isEditing = !isEditing"
          push
        />
        <q-btn
          v-else
          type="submit"
          label="Undo changes"
          color="indigo-7"
          class="text-capitalize q-mr-md rounded-borders"
          @click="loadUserData()"
          push
        />
        <q-btn
          type="submit"
          label="Save profile"
          color="indigo-7"
          class="text-capitalize q-mr-md rounded-borders"
          :disable="!isEditing"
          @click="saveUserData"
          push
        />
        <q-btn
          type="submit"
          label="Log out"
          color="red-7"
          class="text-capitalize rounded-borders"
          @click="logoutUser"
          push
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useApplicationStore } from 'src/stores/applicationStore';
import { ref, onMounted, computed } from 'vue';

const authStore = useAuthenticationStore();
const appStore = useApplicationStore();

let name = ref('');
let isEditing = ref(null);

const currentUser = computed(() => authStore.getCurrentUser);

function loadUserData() {
  isEditing.value = false;
  name.value = currentUser.value.name;
}

function saveUserData() {
  isEditing.value = false;
  authStore.getCurrentUser.name = name.value;
}

async function logoutUser(): Promise<void> {
  appStore.toggleLogoutModal();
}

onMounted(() => loadUserData());
</script>

<style scoped lang="scss">
.input-max-width {
  min-width: 100%;
}

.profile-width {
  min-width: 450px;
}
</style>

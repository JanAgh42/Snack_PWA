<template>
  <q-page class="col row justify-center items-center" fullscreen>
    <div
      class="q-pa-lg bg glass-design rounded-borders column items-center shadow-4 profile-width"
    >
      <div class="q-mb-md text-h6">Profile</div>
      <q-form class="column items-center input-max-width">
        <q-input
          v-model="firstname"
          label="Firstname"
          label-color="grey-7"
          type="text"
          class="input-max-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          :disable="!isEditing"
          dense
          borderless
        />

        <q-input
          v-model="lastname"
          label="Lastname"
          label-color="grey-7"
          type="text"
          class="q-mt-sm input-max-width border"
          :input-style="{ color: 'rgb(158, 158, 158)' }"
          :disable="!isEditing"
          dense
          borderless
        />

        <q-input
          v-model="nickname"
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
          v-model="email"
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
          @click="() => $router.push({ name: 'Main' })"
          push
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { ref, onMounted } from 'vue';

const userStore = useUserStore();

let firstname = ref('');
let lastname = ref('');
let nickname = ref('');
let email = ref('');

let isEditing = ref(null);

function loadUserData() {
  isEditing.value = false;
  firstname.value = userStore.getCurrentUser.firstname;
  lastname.value = userStore.getCurrentUser.lastname;
  nickname.value = userStore.getCurrentUser.nickname;
  email.value = userStore.getCurrentUser.email;
}

function saveUserData() {
  isEditing.value = false;
  userStore.$state.current.firstname = firstname.value;
  userStore.$state.current.lastname = lastname.value;
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

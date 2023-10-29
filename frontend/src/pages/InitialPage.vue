<template>
  <q-page class="justify-center items-center row" fullscreen>
    <section class="items-center column">
      <img src="../assets/images/app_logo.png" alt="Snack logo" id="logo" />
      <div class="text-subtitle1 q-mt-md q-mb-xl text-indigo-3">
        Hungry for connection.
      </div>
      <q-btn
        class="text-capitalize q-px-lg"
        text-color="grey-4"
        color="indigo-10"
        label="Get Started"
        size="lg"
        @click="() => $router.push({ name: 'Register' })"
        rounded
      />
    </section>
  </q-page>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#logo {
  max-height: 100px;
  min-height: 100px;
}

@media (max-width: 400px) {
  #logo {
    max-height: 70px;
    min-height: 70px;
  }
}
</style>

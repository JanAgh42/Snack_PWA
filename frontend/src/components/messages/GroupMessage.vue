<template>
  <q-item>
    <q-item-section class="time-width" top>
      <q-item-label class="time-color" caption> 10:50 AM </q-item-label>
    </q-item-section>
    <q-item-section top>
      <q-item-label>
        <div class="line-height">
          <span class="text-weight-bold q-mr-sm name-color">Jan Agh</span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod
          voluptatem perferendis blanditiis odio libero quas accusantium
          voluptatum veniam aliquam consectetur nulla praesentium dolorem, vitae
          numquam deserunt commodi ullam nihil.
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.name-color {
  color: $grey-4;
}

.time-color {
  color: $grey-7;
}

.line-height {
  line-height: 1.6;
}

.time-width {
  max-width: 60px;
}
</style>

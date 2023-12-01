<template>
  <q-item :clickable="isTyping" :dense="isTyping" @click="toggleShowTypings">
    <q-item-section class="time-width" top>
      <q-item-label class="time-color" caption>{{ message.time }}</q-item-label>
    </q-item-section>
    <q-item-section top>
      <q-item-label>
        <div class="line-height">
          <span class="text-weight-bold q-mr-sm name-color">{{
            message.userName
          }}</span>
          <span v-if="showTypings">{{ typings }}</span>
          <span v-else-if="isTyping">is typing...</span>
          <span v-else>{{ message.content }}</span>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Message from '../../models/users/message';

let isTyping = ref(true);
let showTypings = ref(false);

let typings = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit.');

let message: Message = {
  userName: 'Jan Agh',
  time: '10:50 AM',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod voluptatem perferendis blanditiis odio libero quas accusantium voluptatum veniam aliquam consectetur nulla praesentium dolorem, vitae numquam deserunt commodi ullam nihil.',
};

function toggleShowTypings() {
  if (!isTyping.value) return;

  showTypings.value = !showTypings.value;
}
</script>

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

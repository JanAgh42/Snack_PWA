<template>
  <q-item clickable @click="showTyping">
    <q-item-section class="avatar-width">
      <q-avatar :class="props.member.color" size="lg">{{
        props.member.name.slice(0, 2).toUpperCase()
      }}</q-avatar>
    </q-item-section>
    <q-item-section top>
      <q-item-label class="truncate name-width">
        <span class="">{{ props.member.name }}</span>
      </q-item-label>
      <q-item-label v-if="isTyping" class="typing-color" caption>
        is typing...
      </q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label :style="{ color: props.status.color }" caption>{{
        props.status.name
      }}</q-item-label>
    </q-item-section>
  </q-item>
  <section
    v-if="show"
    class="bkg-darker type-color q-pa-sm rounded-borders type-height text-caption hide-hint-scrollbar"
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero minima, ipsa
    quaerat quas hic illum at consequatur. Rem, atque vitae quasi nulla
    molestiae distinctio quod! Soluta deleniti, repellat blanditiis natus
    mollitia recusandae repudiandae minus odit non ipsum rem optio ratione.
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['member', 'status']);

let isTyping = ref(true);
let show = ref(false);

function showTyping() {
  if (!isTyping.value) return;

  show.value = !show.value;
}
</script>

<style scoped lang="scss">
.name-width {
  max-width: 140px;
}

.avatar-width {
  max-width: 45px;
}

.type-height {
  min-height: 80px;
  max-height: 80px;
  overflow-y: auto;
}

.typing-color {
  color: $grey-7;
}

.type-color {
  color: $grey-5;
}

.hide-hint-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-hint-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

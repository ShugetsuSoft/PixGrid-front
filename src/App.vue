<script setup>
import {RouterView, useRoute} from 'vue-router';
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<style lang="scss">
html, body, #app {
  margin: 0;
  padding: 0;
  height: auto;
  width: 100%;
}

@keyframes show-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>

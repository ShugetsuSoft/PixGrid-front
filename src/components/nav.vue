<script setup>
import {useRouter, useRoute} from "vue-router";
import {computed, ref, watch} from 'vue'

const router = useRouter()
const route = useRoute()

const showNav = computed(() => {
  return route.name !== 'Landing'
})

const returnPage = () => {
  router.push({
    name: 'Landing'
  })
}
</script>

<template>
  <div class="nav-wrapper">
    <div class="nav-container" v-show="showNav">
      <a-button size="large" anim icon="mdi:close" icon-position="trailing" @click="returnPage"></a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
  z-index: 10;
  position: fixed;
  top: 25px;
  left: 25px;

  .nav-container {

  }
}
</style>
<script setup>
import {computed, ref} from 'vue'
import {resultCache as resultCacheStore} from '../store.js'
import {message} from '@any-design/anyui'
import {useRouter} from "vue-router";

const router = useRouter()

const cacheStore = resultCacheStore()

const fileTypes = ['image/png', 'image/jpeg', 'image/webp']

const uploadStatus = ref('default')
const loaded = computed(() => {
  return uploadStatus.value === 'success'
})
const errorMsg = ref('')

const receiveFile = async (file) => {
  console.log(file)
  if (!fileTypes.includes(file.type)) {
    errorMsg.value = "错误的文件类型: 仅支持 PNG, JPG, WEBP文件"
    uploadStatus.value = "error"
    setTimeout(() => {
      uploadStatus.value = 'default'
    }, 3000)
    return
  }
  uploadStatus.value = 'uploading'
  let hash = ''
  try {
    hash = await cacheStore.search(file)
  } catch (e) {
    message({
      type: 'error',
      content: e.message
    })
    errorMsg.value = e.message
    uploadStatus.value = "error"
    console.error(e)
    setTimeout(() => {
      uploadStatus.value = 'default'
    }, 3000)
    return
  }

  uploadStatus.value = 'success'
  setTimeout(async () => {
    await router.push({
      name: "Details",
      params: {
        "hash": hash
      }
    })
  }, 1500)
}
</script>

<template>
  <div class="main-container">
    <div class="decorations" :class="{'loaded': loaded}">
      <div class="component upper"></div>
      <div class="component lower"></div>
    </div>
    <div class="content-container">
      <div class="title-container">
      </div>
      <div class="form-container">
        <a-upload :status="uploadStatus" @upload="receiveFile">
          <span>选择或拖入图片开启搜索之旅</span>
          <template #dragging>
            <span>要来了!</span>
          </template>
          <template #uploading>
            <span><a-spinner class="spinner"/></span>
          </template>
          <template #error>
            <span>{{ errorMsg }}</span>
          </template>
          <template #success>
            <span>完成</span>
          </template>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes show-up {
  0% {
    transform: translateY(200px);
  }

  100% {
    transform: translateY(0%);
  }
}

@keyframes show-down {
  0% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(0%);
  }
}

.main-container {
  height: 100vh;
  width: 100%;
  display: flex;

  .decorations.loaded {
    .component {
      height: calc(100% + 10px) !important;
    }
  }

  .decorations {
    position: absolute;
    height: 100vh;
    width: 100%;
    overflow: hidden;

    .component {
      position: absolute;
      left: 0;
      right: 0;
      height: 200px;
      width: 100%;
      width: 100%;
      transition: height 1s ease-in-out, clip-path 1s ease-in-out;
      z-index: 11;
    }

    .upper {
      top: 0;
      clip-path: polygon(0 0, 0% 100%, 100% 0%);
      background: rgb(243, 116, 51);
      animation: show-down 1s ease-out;
    }

    .lower {
      bottom: 0;
      clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
      background: rgb(243, 116, 51);
      animation: show-up 1s ease-out;
    }
  }

  .content-container {
    margin: auto;
    width: 500px;
    max-width: 100vw;
    min-width: 50%;

    animation: show-in 1s ease-in-out;

    .title-container {
      padding-bottom: 25%;
      width: 100%;
      background-image: url(../assets/images/title.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-blend-mode: difference;
    }

    .form-container {
      width: 80%;
      margin: auto;

      .spinner {
        transform: scale(2.8);
      }

      .a-upload {
        height: 100px;
      }
    }
  }
}
</style>
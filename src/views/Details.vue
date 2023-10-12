<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {resultCache as resultCacheStore} from "../store.js";
import {message} from "@any-design/anyui";
import {calcImg} from '../utils/imgReso.js'

const route = useRoute()
const router = useRouter()
const cacheStore = resultCacheStore()

const hash = ref('')
const result = ref([])

const load = async () => {
  hash.value = route.params["hash"]
  if (hash.value == '') {
    await router.push({
      name: "Landing"
    })
  }

  const state = await cacheStore.ensure(hash.value)
  if (!state) {
    message({
      type: "warning",
      content: "图片不存在"
    })
    await router.push({
      name: "Landing"
    })
  }

  const results = await cacheStore.getResult(hash.value)
  result.value = results["illusts"].map((obj, i) => {
    return {
      ...obj,
      "score": results["scores"][i]
    }
  }).filter((item) => {
    return item.id != 0
  })
}

onMounted(async () => {
  await load()
})

</script>

<template>
  <div class="main-container">
    <div class="decorations">
      <div class="component left"></div>
      <div class="component right"></div>
    </div>
    <div class="main-wrapper">
      <a v-for="(illust, i) in result" :key="illust.id" :href="'https://pixivel.moe/illust/' + illust.id.toString()"
         target="_blank">
        <div class="item" :style="{'animation-delay': `${i*0.2}s`}">
          <img :src="calcImg(illust.id, 0, illust.image, 'thumb_mini')" width="128" height="128" class="image"/>
          <div class="details">
            <div class="group-top">
              <div class="title">{{ illust.altTitle }}</div>
              <div class="tags">
                <a-tag size="small" v-for="tag in illust.tags">{{ tag.name }}</a-tag>
              </div>
            </div>
            <div class="group-bottom">
              <div class="links">
                #{{ illust.id }}
              </div>
              <div class="match-score">
                Φ:{{ illust.score }}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes hide-down {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

.main-container {
  margin: 0;
  padding: 0;
  width: 100%;

  .decorations {
    position: absolute;
    height: 100vh;
    width: 100%;
    overflow: hidden;

    .component {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 0%;
      transition: width 1s ease-in-out, clip-path 1s ease-in-out;
      z-index: 11;
    }

    .left {
      left: 0;
      clip-path: polygon(0 0, 0% 100%, 100% 0%);
      background: rgb(243, 116, 51);
      animation: hide-down 1s ease-in-out;
    }

    .right {
      right: 0;
      clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
      background: rgb(243, 116, 51);
      animation: hide-down 1s ease-in-out;
    }
  }

  .main-wrapper {
    margin-left: auto;
    margin-right: auto;

    width: 500px;
    max-width: 100vw;
    min-width: 50%;
    padding-top: 20px;
    padding-bottom: 20px;

    a {
      text-decoration: none;
    }

    .item {
      box-shadow: 0 8px 12px var(--shadow-5);
      border-radius: 16px;
      overflow: hidden;
      background: var(--bg-bright);
      margin-bottom: 15px;
      padding: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      animation: show-in 1s ease-in-out;
      animation-fill-mode: forwards;
      opacity: 0;

      .details {
        width: 10px;
        flex: 1;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .group-top {

          .title {
            color: var(--text);
            font-size: 18px;
            font-weight: 600;
            line-height: 32px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            letter-spacing: .05rem;
            margin-bottom: 5px;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 8px;

            .a-tag {
              margin-left: 1px;
              margin-bottom: 5px;
            }
          }
        }


        .group-bottom {
          display: flex;
          flex-direction: row-reverse;

          .match-score {
            margin-right: 10px;
          }

          .links {
            display: flex;
          }
        }
      }

      .image {
        flex: 0;
        height: 128px;
        width: 128px;
        border-radius: 10px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
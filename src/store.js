import { defineStore } from "pinia";
import { calculateSHA256, resize } from "./utils/compute.js";
import { cacheSearch, uploadSearch } from "./utils/request.js";

export const resultCache = defineStore("resultCache", {
  state: () => ({ cache: {} }),
  getters: {
    getResult: (state) => (hash) => state.cache[hash],
  },
  actions: {
    async search(file) {
      const resized = await resize(file);
      const hash = await calculateSHA256(resized);
      const state = await this.ensure(hash);
      if (!state) {
        const response = await uploadSearch(resized);
        this.cache[hash] = response;
      }
      return hash;
    },
    async ensure(hash) {
      if (this.cache[hash]) {
        return true;
      }
      const response = await cacheSearch(hash);
      if (response) {
        this.cache[hash] = response;
        return true;
      } else {
        return false;
      }
    },
  },
});

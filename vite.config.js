import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { AnyUIResolver } from "@any-design/anyui/lib/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AnyUIResolver()],
    }),
    Components({
      resolvers: [AnyUIResolver()],
    }),
  ],
});

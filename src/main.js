import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/main.scss";
import AnyUI from "@any-design/anyui";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(AnyUI).use(router).use(pinia).mount("#app");

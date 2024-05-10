import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import store from "./store";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "resize-observer-polyfill";
import Particles from "particles.vue3";

createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(Particles)
  .use(ArcoVueIcon)
  .mount("#app");

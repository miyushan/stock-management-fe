import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "@/router";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);
const options: PluginOptions = {
  timeout: 2000,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

app.use(pinia);
app.use(router);
app.use(VueApexCharts);
app.use(Toast, options);
app.mount("#app");

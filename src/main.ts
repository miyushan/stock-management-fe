import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import Dashboard from "@/components/layouts/Dashboard.vue";
import Auth from "@/components/layouts/Auth.vue";
import LogIn from "@/components/Auth/LogIn.vue";
import Register from "@/components/Auth/Register.vue";
import Profile from "@/components/Dashboard/Profile.vue";
import StockPredictions from "@/components/Dashboard/StockPredictions.vue";
import HistoricalData from "@/components/Dashboard/HistoricalData.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "profile-info", component: Profile },
      { path: "stock-predictions", component: StockPredictions },
      { path: "historical-data", component: HistoricalData },
    ],
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: LogIn },
      { path: "register", component: Register },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");

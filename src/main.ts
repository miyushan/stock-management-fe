import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import Dashboard from "@/components/layouts/Dashboard.vue";
import Auth from "@/components/layouts/Auth.vue";
import LogIn from "@/components/Auth/LogIn.vue";
import Register from "@/components/Auth/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Dashboard },
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

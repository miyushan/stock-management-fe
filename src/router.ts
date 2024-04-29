import Dashboard from "@/components/layouts/Dashboard.vue";
import Auth from "@/components/layouts/Auth.vue";
import LogIn from "@/components/Auth/LogIn.vue";
import Register from "@/components/Auth/Register.vue";
import Profile from "@/components/Dashboard/Profile.vue";
import StockPredictions from "@/components/Dashboard/StockPredictions.vue";
import HistoricalData from "@/components/Dashboard/HistoricalData.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/lib/useProfileStore";

const routes = [
  {
    path: "/",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: "", redirect: "profile-info" },
      { path: "profile-info", component: Profile },
      { path: "stock-predictions", component: StockPredictions },
      { path: "historical-data", component: HistoricalData },
    ],
  },
  {
    path: "/auth",
    component: Auth,
    meta: { requiresAuth: false },
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

router.beforeEach((to) => {
  const { isAdminUser } = useProfileStore();

  if (to.meta.requiresAuth && !isAdminUser)
    return {
      path: "/auth/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
});

export default router;

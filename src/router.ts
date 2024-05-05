import Dashboard from "@/components/layouts/Dashboard.vue";
import Auth from "@/components/layouts/Auth.vue";
import LogIn from "@/components/Auth/LogIn.vue";
import Register from "@/components/Auth/Register.vue";
import Profile from "@/components/Dashboard/Profile.vue";
import StockPrediction from "@/components/Dashboard/StockPrediction.vue";
import StockAnalysis from "@/components/Dashboard/StockAnalysis.vue";
import Database from "@/components/Dashboard/Database.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/lib/useProfileStore";
import RegisterAdmin from "./components/Auth/RegisterAdmin.vue";

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
      { path: "stock-analysis", component: StockAnalysis },
      { path: "stock-prediction", component: StockPrediction },
      { path: "database", component: Database, meta: { requiresAdmin: true } },
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
  {
    path: "/auth",
    component: Auth,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "register-admin",
        component: RegisterAdmin,
        meta: { requiresAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isUserLoggedIn, isAdminUser } = useProfileStore();

  if (to.meta.requiresAuth) {
    if (!isUserLoggedIn) {
      // If user is not logged in, redirect to login
      return {
        path: "/auth/login",
        query: { redirect: to.fullPath },
      };
    } else if (to.meta.requiresAdmin && !isAdminUser) {
      // If user is logged in but not admin, redirect to profile
      return {
        path: "/profile-info",
      };
    }
  }
});

export default router;

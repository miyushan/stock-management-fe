<template>
  <div v-if="!isLoggedIn">
    <Auth />
  </div>
  <div v-else>
    <Dashboard />
  </div>
</template>

<script>
import { ref } from "vue";
import Dashboard from "@/components/layouts/Dashboard.vue";
import Auth from "@/components/layouts/Auth.vue";

const isLoggedIn = ref(false);

export default {
  name: "App",
  components: {
    Dashboard,
    Auth,
  },
  setup() {
    return { isLoggedIn };
  },
};
</script>

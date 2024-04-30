import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userName = ref("");
  const isLoggedIn = ref(false);
  const isAdmin = ref(false);

  const isAdminUser = computed(() => isAdmin.value);
  const isUserLoggedIn = computed(() => isLoggedIn.value);

  function setProfileInfo(name: string, admin: boolean) {
    userName.value = name;
    isLoggedIn.value = true;
    isAdmin.value = admin;
  }

  function resetProfileInfo() {
    userName.value = "";
    isLoggedIn.value = false;
    isAdmin.value = false;
  }

  return {
    isAdminUser,
    isUserLoggedIn,
    setProfileInfo,
    resetProfileInfo,
  };
});

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userName = ref<string | null>(null);
  const isLoggedIn = ref<boolean | null>(null);
  const isAdmin = ref<boolean | null>(null);

  const isAdminUser = computed(() => isAdmin.value);
  const isUserLoggedIn = computed(() => isLoggedIn.value);
  const getUserName = computed(() => userName.value);

  function setProfileInfo(name: string, admin: boolean) {
    userName.value = name;
    isLoggedIn.value = true;
    isAdmin.value = admin;
  }

  function resetProfileInfo() {
    userName.value = null;
    isLoggedIn.value = null;
    isAdmin.value = null;
  }

  return {
    isAdminUser,
    isUserLoggedIn,
    setProfileInfo,
    resetProfileInfo,
    getUserName,
  };
});

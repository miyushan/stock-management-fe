import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userName = ref("");
  const isAdmin = ref(false);

  const isAdminUser = computed(() => isAdmin.value);

  function setProfileInfo(name) {
    userName.value = name;
    isAdmin.value = true;
  }

  function resetProfileInfo() {
    userName.value = "";
    isAdmin.value = false;
  }

  return {
    userName,
    isAdminUser,
    setProfileInfo,
    resetProfileInfo,
  };
});

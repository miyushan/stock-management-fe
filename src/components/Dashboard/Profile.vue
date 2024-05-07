<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { onMounted, ref } from "vue";

type profileInfoType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  address_3: string;
};

const loading = ref(false);
const error = ref<string | null>(null);
const profileInfo = ref<profileInfoType | null>(null);

onMounted(fetchData);

async function fetchData() {
  loading.value = true;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/profile`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    profileInfo.value = response.data;
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Profile Info</h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <Card>
        <CardContent class="pt-6 md:min-w-[300px]">
          <div v-if="loading" class="flex items-center justify-center">
            <p class="text-sm text-muted-foreground">Loading...</p>
          </div>

          <div v-else-if="profileInfo" class="grid gap-8">
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">First Name</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.first_name }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Last Name</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.last_name }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Email</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.email }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Phone</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.phone }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Address 1</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.address_1 }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Address 2</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.address_2 }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Address 3</p>
                <p class="text-sm text-muted-foreground">
                  {{ profileInfo.address_3 }}
                </p>
              </div>
            </div>
          </div>

          <div v-else-if="error" class="flex items-center justify-center">
            <p class="text-red-500">{{ error }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>

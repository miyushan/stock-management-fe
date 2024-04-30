<script setup lang="ts">
import { Microscope, Database, CircleUser, LineChart } from "lucide-vue-next";

import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/useProfileStore";

const router = useRouter();
const { resetProfileInfo, isAdminUser } = useProfileStore();

const sideBarItems = reactive([
  {
    icon: CircleUser,
    text: "Profile",
    href: "/profile-info",
  },
  {
    icon: LineChart,
    text: "Stock Analysis",
    href: "/stock-analysis",
  },
  {
    icon: Microscope,
    text: "Stock Prediction",
    href: "/stock-prediction",
  },
  {
    icon: Database,
    text: "Database",
    href: "/database",
  },
]);

if (!isAdminUser) {
  sideBarItems.pop();
}

const logOutClick = () => {
  resetProfileInfo();
  router.push({ path: "/auth/login", replace: true });
};
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div class="flex items-center gap-2 font-semibold">
            <span class="text-lg font-bold">Stock Pro</span>
          </div>
          <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button> -->
        </div>

        <div class="flex-1 flex flex-col">
          <nav
            class="grid items-start px-2 text-sm font-medium lg:px-4 lg:py-4"
          >
            <RouterLink
              v-for="item in sideBarItems"
              :key="item.href"
              :to="item.href"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              activeClass="bg-muted text-primary"
            >
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.text }}
            </RouterLink>
          </nav>

          <div class="flex-1 content-end p-4">
            <Card>
              <!-- <CardHeader class="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader> -->
              <CardContent class="p-2 pt-0 md:p-4">
                <Button @click.prevent="logOutClick" size="sm" class="w-full">
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="p-6 min-h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lightbulb, Database, CircleUser } from "lucide-vue-next";

import { reactive } from "vue";
import { RouterLink } from "vue-router";
// import Header from "@/components/Header.vue";

const sideBarItems = reactive([
  {
    icon: CircleUser,
    text: "Profile",
    href: "/profile-info",
  },
  {
    icon: Lightbulb,
    text: "Stock Predictions",
    href: "/stock-predictions",
    badge: 6,
  },
  {
    icon: Database,
    text: "Historical Data",
    href: "/historical-data",
  },
]);
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <span class="text-lg font-bold">Stock Pro</span>
          </a>
          <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button> -->
        </div>

        <div class="flex-1">
          <nav
            class="grid items-start px-2 text-sm font-medium lg:px-4 lg:py-4"
          >
            <RouterLink
              v-for="sideBarItem in sideBarItems"
              :to="sideBarItem.href"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              activeClass="bg-muted text-primary"
            >
              <component :is="sideBarItem.icon" class="h-4 w-4" />
              {{ sideBarItem.text }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="p-4">
        <router-view />
      </div>
      <!-- <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
        </div>
        <div
          class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <div class="flex flex-col items-center gap-1 text-center">
            <h3 class="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p class="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button class="mt-4"> Add Product </Button>
          </div>
        </div>
      </main> -->
    </div>
  </div>
</template>

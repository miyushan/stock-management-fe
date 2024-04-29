<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

const profileInfo = {
  firstName: "Olivia",
  lastName: "Martin",
  email: "oliviya@gmail.com",
  Phone: "1234567890",
  address1: "1234 Main St",
  address2: "Apt 123",
  address3: "New York, NY 10001",
};
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
        <!-- <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader> -->
        <CardContent class="pt-6 grid gap-8 md:min-w-[300px]">
          <div class="flex items-center gap-4">
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">First Name</p>
              <p class="text-sm text-muted-foreground">
                {{ profileInfo.firstName }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Last Name</p>
              <p class="text-sm text-muted-foreground">
                {{ profileInfo.lastName }}
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
                {{ profileInfo.Phone }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Address 1</p>
              <p class="text-sm text-muted-foreground">
                {{ profileInfo.address1 }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Address 2</p>
              <p class="text-sm text-muted-foreground">
                {{ profileInfo.address2 }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>

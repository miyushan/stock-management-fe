<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Historical Data</h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <Card>
        <!-- <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader> -->
        <CardContent class="pt-6 grid gap-8 md:min-w-[300px]"> </CardContent>
      </Card>
    </div>
  </main>
</template>

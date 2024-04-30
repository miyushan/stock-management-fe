<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Database</h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <Card>
        <CardContent class="p-2 pt-0 md:p-4 min-w-[200px]">
          <Button size="sm" class="w-full"> Upload Data </Button>
        </CardContent></Card
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-vue-next";
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Stock Prediction</h1>
    </div>
    <div
      class="flex-1 flex items-center justify-between rounded-lg border border-dashed shadow-sm"
    >
      <Card class="basis-1/2 mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl"> Predict future stock price </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-3">
              <Label for="company">Company</Label>
              <Select>
                <SelectTrigger
                  id="company"
                  class="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select1">
                    <div class="flex items-start text-muted-foreground">
                      <Rabbit class="" />
                      <div class="grid gap-0.5">
                        <p>Lexa</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="select2">
                    <div class="flex items-start text-muted-foreground">
                      <Rabbit class="" />
                      <div class="grid gap-0.5">
                        <p>Shevron</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="select3">
                    <div class="flex items-start text-muted-foreground">
                      <Rabbit class="" />
                      <div class="grid gap-0.5">
                        <p>Shevron</p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid gap-3">
              <Label for="date">Date</Label>
              <Button
                variant="outline"
                class="justify-start text-left font-normal text-muted-foreground"
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                2024-05-07
              </Button>
            </div>

            <Button type="submit" class="mt-2 w-full"> Check </Button>
          </div>
        </CardContent>
      </Card>

      <div class="basis-1/2 p-4 text-center">
        <span class="mr-4">Predicted Value</span>
        <span class="font-bold">72</span>
      </div>
    </div>
  </main>
</template>

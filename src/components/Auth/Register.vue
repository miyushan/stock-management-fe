<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>

<template>
  <div class="min-h-screen flex items-center content-center">
    <Card class="mx-auto w-[600px]">
      <CardHeader>
        <CardTitle class="text-xl"> Register </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="phone">Mobile</Label>
              <Input id="phone" type="tel" required />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="address1">Address 1</Label>
              <Input id="address1" type="text" required />
            </div>
            <div class="grid gap-2">
              <Label for="address2">Address 2</Label>
              <Input id="address2" type="text" required />
            </div>
            <div class="grid gap-2">
              <Label for="address3">Address 3</Label>
              <Input id="address3" type="text" required />
            </div>
          </div>

          <Button type="submit" class="mt-2 w-full"> Create an account </Button>
          <!-- <Button variant="outline" class="w-full"> Sign In </Button> -->
        </div>
      </CardContent>
    </Card>
  </div>
</template>

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
import { useProfileStore } from "@/lib/useProfileStore";
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { setProfileInfo } = useProfileStore();
const route = useRoute();

const loginClick = () => {
  setProfileInfo("Shane");

  const redirectUrl = ref("/profile-info");
  if (route.query.redirect) {
    redirectUrl.value = route.query.redirect as string;
  }
  router.push(redirectUrl.value);
};

const navigateToCreateAccount = () => {
  router.push("/auth/register");
};
</script>

<template>
  <div class="min-h-screen flex items-center content-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
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
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <!-- <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a> -->
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button @click.prevent="loginClick" type="submit" class="mt-2 w-full">
            Login
          </Button>
          <Button
            @click.prevent="navigateToCreateAccount"
            variant="outline"
            class="w-full"
          >
            Create Account
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

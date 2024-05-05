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
import { useProfileStore } from "@/store/useProfileStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";

const { setProfileInfo, isAdminUser } = useProfileStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const logInClick = handleSubmit(async (value) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      {
        ...value,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    console.log(response.data);
    setProfileInfo("Shane Watson", true);
    toast.success("You have successfully logged in");
    redirectToAuthViews();
  } catch (error) {
    toast.error("Invalid email or password");
    console.error(error);
  }
});

const redirectToAuthViews = () => {
  const redirectUrl = ref("/profile-info");
  if (route.query.redirect) {
    redirectUrl.value = route.query.redirect as string;
  }
  router.push(redirectUrl.value);
};

const navigateToCreateAccount = () => {
  router.push("/auth/register");
};

const navigateToCreateAdminAccount = () => {
  router.push("/auth/register-admin");
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
        <form class="grid gap-4" @submit="logInClick">
          <div>
            <Label for="email">Email</Label>
            <Input
              class="mt-0.5"
              v-model="email"
              id="email"
              type="email"
              placeholder="yourmail@gmail.com"
              required
            />
            <span v-if="errors.email" class="text-xs text-red-500">{{
              errors.email
            }}</span>
          </div>

          <div>
            <Label for="password">Password</Label>
            <Input
              class="mt-0.5"
              v-model="password"
              id="password"
              type="password"
              required
            />
            <span v-if="errors.password" class="text-xs text-red-500">{{
              errors.password
            }}</span>
          </div>

          <Button type="submit" class="mt-2 w-full"> Login </Button>
          <Button
            @click.prevent="navigateToCreateAccount"
            variant="outline"
            class="w-full"
          >
            Create Account
          </Button>

          <Button
            v-if="isAdminUser"
            @click.prevent="navigateToCreateAdminAccount"
            variant="outline"
            class="w-full"
          >
            Create Admin Account
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

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
import { useRouter } from "vue-router";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";
import { useProfileStore } from "@/lib/useProfileStore";

const { isAdminUser } = useProfileStore();
const router = useRouter();
const toast = useToast();

const validationSchema = toTypedSchema(
  z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    address_1: z.string().min(1, "Address 1 is required"),
    address_2: z.string().min(1, "Address 2 is required"),
    address_3: z.string().min(1, "Address 3 is required"),
  })
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: first_name } = useField<string>("first_name");
const { value: last_name } = useField<string>("last_name");
const { value: email } = useField<string>("email");
const { value: phone } = useField<string>("phone");
const { value: password } = useField<string>("password");
const { value: address_1 } = useField<string>("address_1");
const { value: address_2 } = useField<string>("address_2");
const { value: address_3 } = useField<string>("address_3");

const createUserAccount = handleSubmit(async (value) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/register`,
      {
        ...value,
        user_type: "admin",
      }
    );
    console.log(response.data);
    toast.success("You have successfully created an admin account");
    navigateToLogin();
  } catch (error) {
    console.error(error);
  }
});

const navigateToLogin = () => {
  router.push("/auth/login");
};

const navigateToCreateCustomerAccount = () => {
  router.push("/auth/register");
};
</script>

<template>
  <div class="min-h-screen flex items-center content-center">
    <Card class="mx-auto w-[600px]">
      <CardHeader>
        <CardTitle class="text-xl"> Admin Register </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit="createUserAccount">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="first-name">First name</Label>
              <Input
                class="mt-0.5"
                name="first_name"
                v-model="first_name"
                id="first-name"
                placeholder="Max"
                required
              />
              <span v-if="errors.first_name" class="text-xs text-red-500">{{
                errors.first_name
              }}</span>
            </div>
            <div>
              <Label for="last-name">Last name</Label>
              <Input
                class="mt-0.5"
                v-model="last_name"
                id="last-name"
                placeholder="Robinson"
                required
              /><span v-if="errors.last_name" class="text-xs text-red-500">{{
                errors.last_name
              }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="email">Email</Label>
              <Input
                class="mt-0.5"
                v-model="email"
                id="email"
                type="email"
                placeholder="yourmail@gmail.com"
                required
              /><span v-if="errors.email" class="text-xs text-red-500">{{
                errors.email
              }}</span>
            </div>
            <div>
              <Label for="phone">Mobile</Label>
              <Input
                class="mt-0.5"
                v-model="phone"
                id="phone"
                type="tel"
                required
              /><span v-if="errors.phone" class="text-xs text-red-500">{{
                errors.phone
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="password">Password</Label>
              <Input
                class="mt-0.5"
                v-model="password"
                id="password"
                type="password"
              /><span v-if="errors.password" class="text-xs text-red-500">{{
                errors.password
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="address1">Address 1</Label>
              <Input
                class="mt-0.5"
                v-model="address_1"
                id="address1"
                type="text"
                required
              /><span v-if="errors.address_1" class="text-xs text-red-500">{{
                errors.address_1
              }}</span>
            </div>
            <div>
              <Label for="address2">Address 2</Label>
              <Input
                class="mt-0.5"
                v-model="address_2"
                id="address2"
                type="text"
                required
              /><span v-if="errors.address_2" class="text-xs text-red-500">{{
                errors.address_2
              }}</span>
            </div>
            <div>
              <Label for="address3">Address 3</Label>
              <Input
                class="mt-0.5"
                v-model="address_3"
                id="address3"
                type="text"
                required
              /><span v-if="errors.address_3" class="text-xs text-red-500">{{
                errors.address_3
              }}</span>
            </div>
          </div>

          <Button type="submit" class="mt-2 w-full">
            Create an admin account
          </Button>
          <Button
            v-if="isAdminUser"
            @click.prevent="navigateToCreateCustomerAccount"
            type="submit"
            variant="outline"
            class="mt-2 w-full"
          >
            Create a customer account
          </Button>
          <Button
            @click.prevent="navigateToLogin"
            variant="outline"
            class="w-full"
          >
            Log In
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

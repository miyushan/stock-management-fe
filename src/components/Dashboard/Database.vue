<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";

const toast = useToast();
const baseURL = import.meta.env.VITE_SERVER_URL;

const validationSchema = toTypedSchema(
  z.object({
    companyName: z.string().min(1, "Company name is required"),
  })
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: companyName } = useField<string>("companyName");

const uploadData = async (companyName: string, csv: File) => {
  const formData = new FormData();
  formData.append("companyName", companyName);
  formData.append("file", csv);
  await axios
    .post(`${baseURL}/historical/upload`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      toast.success("Data uploaded successfully");
    })
    .catch((error) => {
      toast.error("Error uploading data");
      console.error(error);
    });
};

const onUploadData = handleSubmit(async (value) => {
  const csv = (document.getElementById("csv") as HTMLInputElement).files?.[0];
  if (!csv) {
    toast.error("Please select a CSV file");
    return;
  }
  if (csv.type !== "text/csv") {
    toast.error("Please select a CSV file");
    return;
  }
  await uploadData(value.companyName, csv);
});
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Database</h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <form
        @submit.prevent="onUploadData"
        class="grid w-full max-w-xs items-center gap-1.5"
      >
        <div>
          <Label for="companyName">Company Name</Label>
          <Input
            class="mt-0.5"
            v-model="companyName"
            id="companyName"
            type="text"
            placeholder="Enter company name"
          />
          <span v-if="errors.companyName" class="text-xs text-red-500">{{
            errors.companyName
          }}</span>
        </div>
        <div>
          <Label for="csv">CSV File</Label>
          <Input class="mt-0.5" id="csv" type="file" accept="text/csv" />
        </div>
        <span class="mt-2">
          <Button type="submit" size="sm">Upload</Button>
        </span>
      </form>
    </div>
  </main>
</template>

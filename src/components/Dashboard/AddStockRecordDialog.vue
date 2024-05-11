<script setup lang="ts">
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";
import { computed, onMounted, reactive, ref } from "vue";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { cn } from "@/lib/utils";
import { toDate } from "radix-vue/date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { CompanyType } from "@/lib/types";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const toast = useToast();
const loading = ref(false);
const error = ref<string | null>(null);
const availableCompanies = reactive<CompanyType[]>([]);

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const validationSchema = toTypedSchema(
  z.object({
    companyId: z.string({
      required_error: "Please select a company",
    }),
    date: z.string().refine((v) => v, { message: "Date is required" }),
    quantity: z.number().min(0, "Quantity is required"),
    price: z.number().min(1, "Price is required"),
  })
);

const { handleSubmit, errors, values, setValues } = useForm({
  validationSchema,
  initialValues: {
    date: today(getLocalTimeZone()).toString(),
  },
});

const { value: quantity } = useField<string>("quantity");
const { value: price } = useField<string>("price");

const date = computed({
  get: () => (values.date ? parseDate(values.date) : undefined),
  set: (val) => val,
});

onMounted(fetchCompaniesForSelect);

async function fetchCompaniesForSelect() {
  loading.value = true;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/company/select`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    availableCompanies.push(...response.data);
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}

const addStockRecord = handleSubmit(async (value) => {
  console.log(value);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user-stock/create`,
      {
        CompanyID: parseInt(value.companyId),
        Date: value.date,
        Quantity: value.quantity,
        Price: value.price,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    console.log(response.data);
    toast.success("You have successfully created an account");
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <form class="grid gap-4" @submit.prevent="addStockRecord">
    <div>
      <!-- <div class=""> -->
      <!-- <Label class="text-right">Company</Label>
        <Select>
          <SelectTrigger class="col-span-3">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="company in availableCompanies"
                :key="company.id"
                :value="company.id.toString()"
              >
                {{ company.company_name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> -->
      <FormField v-slot="{ componentField }" name="companyId">
        <FormItem class="grid grid-cols-4 items-center gap-x-4 gap-y-0">
          <Label class="text-right">Company</Label>
          <Select v-bind="componentField">
            <FormControl class="col-span-3">
              <SelectTrigger>
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="company in availableCompanies"
                  :key="company.id"
                  :value="company.id.toString()"
                >
                  {{ company.company_name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div
            v-if="errors.companyId"
            class="col-start-2 col-span-3 text-xs text-red-500"
          >
            {{ errors.companyId }}
          </div>
        </FormItem>
      </FormField>
    </div>
    <!-- </div> -->

    <div>
      <div class="grid grid-cols-4 items-center gap-x-4 gap-y-1">
        <Label class="text-right">Date</Label>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="
                cn(
                  'col-span-3 ps-3 text-start font-normal',
                  !date && 'text-muted-foreground'
                )
              "
            >
              <div>
                {{ date ? df.format(toDate(date)) : "Pick a date" }}
              </div>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
            </Button>
            <input hidden />
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model="date"
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="
                (v) => {
                  if (v) {
                    setValues({
                      date: v.toString(),
                    });
                  } else {
                    setValues({
                      date: '',
                    });
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <span
          v-if="errors.date"
          class="col-start-2 col-span-3 text-xs text-red-500 mt-0"
          >{{ errors.date }}</span
        >
      </div>
    </div>

    <div class="grid grid-cols-4 items-center gap-x-4 gap-y-1">
      <Label for="quantity" class="text-right">Quantity</Label>
      <Input
        type="number"
        step=".01"
        class="mt-0.5 col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        name="quantity"
        v-model="quantity"
        id="quantity"
      />
      <span
        v-if="errors.quantity"
        class="col-start-2 col-span-3 text-xs text-red-500"
        >{{ errors.quantity }}</span
      >
    </div>
    <div class="grid grid-cols-4 items-center gap-x-4 gap-y-1">
      <Label for="price" class="text-right">Price</Label>
      <Input
        type="number"
        step=".01"
        class="mt-0.5 col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        name="price"
        v-model="price"
        id="price"
      />
      <span
        v-if="errors.price"
        class="col-start-2 col-span-3 text-xs text-red-500"
        >{{ errors.price }}</span
      >
    </div>
    <DialogFooter>
      <Button type="submit"> Save changes </Button>
    </DialogFooter>
  </form>
</template>

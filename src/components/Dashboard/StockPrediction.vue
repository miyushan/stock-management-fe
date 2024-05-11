<script setup lang="ts">
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref, reactive } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { onMounted } from "vue";
import { CompanyType, RecordType } from "@/lib/types";

export type StockType = {
  date: string;
  value: number;
};

const chartOptions = reactive({
  chart: {
    type: "area",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  stroke: {
    curve: "smooth",
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    title: {
      text: "Price",
    },
  },
  xaxis: {
    type: "datetime",
    title: {
      text: "Date Range",
    },
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val: number) {
        return (val / 1000000).toFixed(0);
      },
    },
  },
});

const validationSchema = toTypedSchema(
  z.object({
    companyId: z.string({
      required_error: "Please select a Company",
    }),
    type: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    type: "close",
  },
});

const loading = ref(false);
const error = ref<string | null>(null);
const availableCompanies = ref<CompanyType[]>([]);
const availableTypes = ref<RecordType[]>([
  { id: 0, type_name: "open" },
  { id: 1, type_name: "close" },
  { id: 2, type_name: "high" },
  { id: 3, type_name: "low" },
]);
const series = reactive([
  {
    data: [],
  },
]);

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
    availableCompanies.value = response.data;
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}

const fetchHistoricalData = handleSubmit(async (value) => {
  loading.value = true;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user-stock/get_by_company`,
      {
        params: {
          CompanyId: parseInt(value.companyId),
          record_type: value.type,
        },
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    series[0].data = response.data.map((stock: StockType) => ({
      x: new Date(stock.date).getTime(),
      y: stock.value,
    }));
    console.log(series[0].data.length);
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold md:text-2xl">Stock Prediction</h1>
    </div>
    <div
      class="flex-1 flex flex-col items-center p-6 rounded-lg border border-dashed shadow-sm"
    >
      <form
        @submit.prevent="fetchHistoricalData"
        class="w-full flex items-start justify-center space-x-2 mb-6 h-[95px]"
      >
        <div class="w-full max-w-[240px]">
          <FormField v-slot="{ componentField }" name="companyId">
            <FormItem class="flex flex-col">
              <FormLabel>Company Name</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
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
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="w-full max-w-[150px]">
          <FormField v-slot="{ componentField }" name="type">
            <FormItem class="flex flex-col">
              <FormLabel>Record Type</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="type in availableTypes"
                      :key="type.id"
                      :value="type.type_name"
                    >
                      {{ type.type_name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>
        </div>

        <Button type="submit" class="mt-[22px]">Analyze</Button>
      </form>
      <div id="chart" class="w-full max-w-[900px]">
        <apexchart
          type="area"
          height="500"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </main>
</template>

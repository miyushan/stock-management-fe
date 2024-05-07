<script setup lang="ts">
import { reactive } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Ref, ref, watch } from "vue";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import {
  CalendarDate,
  type DateValue,
  isEqualMonth,
} from "@internationalized/date";

import { type DateRange, RangeCalendarRoot, useDateFormatter } from "radix-vue";
import { type Grid, createMonth, toDate } from "radix-vue/date";
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from "@/components/ui/range-calendar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import axios from "axios";
import { onMounted } from "vue";

type CompanyType = {
  id: number;
  company_name: string;
};

const loading = ref(false);
const error = ref<string | null>(null);
const availableCompanies = ref<CompanyType[]>([]);

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
    console.log(availableCompanies.value);

    // profileInfo.value = response.data;
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}

async function fetchHistoricalData() {
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
    console.log(availableCompanies.value);

    // profileInfo.value = response.data;
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}

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

const series = reactive([
  {
    data: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
    ],
  },
]);

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>;

const locale = ref("en-US");
const formatter = useDateFormatter(locale.value);

const placeholder = ref(value.value.start) as Ref<DateValue>;
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>;

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  })
) as Ref<Grid<DateValue>>;
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  })
) as Ref<Grid<DateValue>>;

function updateMonth(reference: "first" | "second", months: number) {
  if (reference === "first") {
    placeholder.value = placeholder.value.add({ months });
  } else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    });
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    });
  }
});

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
    placeholder.value = placeholder.value.subtract({ months: 1 });
});
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Stock Analysis</h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div id="chart" class="min-w-[900px]">
        <div class="flex items-center justify-start space-x-2 mb-8">
          <Select>
            <SelectTrigger
              id="company"
              class="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="comp in availableCompanies"
                :key="comp.id"
                :value="comp.company_name"
              >
                <div class="flex items-start text-muted-foreground">
                  <Rabbit class="" />
                  <div class="grid gap-0.5">
                    <p>{{ comp.company_name }}</p>
                  </div>
                </div>
              </SelectItem>
              <!-- <SelectItem value="select2">
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
                </SelectItem> -->
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground'
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <template v-if="value.start">
                  <template v-if="value.end">
                    {{
                      formatter.custom(toDate(value.start), {
                        dateStyle: "medium",
                      })
                    }}
                    -
                    {{
                      formatter.custom(toDate(value.end), {
                        dateStyle: "medium",
                      })
                    }}
                  </template>

                  <template v-else>
                    {{
                      formatter.custom(toDate(value.start), {
                        dateStyle: "medium",
                      })
                    }}
                  </template>
                </template>
                <template v-else> Pick a date </template>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <RangeCalendarRoot
                v-slot="{ weekDays }"
                v-model="value"
                v-model:placeholder="placeholder"
                class="p-3"
              >
                <div
                  class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
                >
                  <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between">
                      <button
                        :class="
                          cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                          )
                        "
                        @click="updateMonth('first', -1)"
                      >
                        <ChevronLeft class="h-4 w-4" />
                      </button>
                      <div :class="cn('text-sm font-medium')">
                        {{
                          formatter.fullMonthAndYear(toDate(firstMonth.value))
                        }}
                      </div>
                      <button
                        :class="
                          cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                          )
                        "
                        @click="updateMonth('first', 1)"
                      >
                        <ChevronRight class="h-4 w-4" />
                      </button>
                    </div>
                    <RangeCalendarGrid>
                      <RangeCalendarGridHead>
                        <RangeCalendarGridRow>
                          <RangeCalendarHeadCell
                            v-for="day in weekDays"
                            :key="day"
                            class="w-full"
                          >
                            {{ day }}
                          </RangeCalendarHeadCell>
                        </RangeCalendarGridRow>
                      </RangeCalendarGridHead>
                      <RangeCalendarGridBody>
                        <RangeCalendarGridRow
                          v-for="(weekDates, index) in firstMonth.rows"
                          :key="`weekDate-${index}`"
                          class="mt-2 w-full"
                        >
                          <RangeCalendarCell
                            v-for="weekDate in weekDates"
                            :key="weekDate.toString()"
                            :date="weekDate"
                          >
                            <RangeCalendarCellTrigger
                              :day="weekDate"
                              :month="firstMonth.value"
                            />
                          </RangeCalendarCell>
                        </RangeCalendarGridRow>
                      </RangeCalendarGridBody>
                    </RangeCalendarGrid>
                  </div>
                  <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between">
                      <button
                        :class="
                          cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                          )
                        "
                        @click="updateMonth('second', -1)"
                      >
                        <ChevronLeft class="h-4 w-4" />
                      </button>
                      <div :class="cn('text-sm font-medium')">
                        {{
                          formatter.fullMonthAndYear(toDate(secondMonth.value))
                        }}
                      </div>

                      <button
                        :class="
                          cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                          )
                        "
                        @click="updateMonth('second', 1)"
                      >
                        <ChevronRight class="h-4 w-4" />
                      </button>
                    </div>
                    <RangeCalendarGrid>
                      <RangeCalendarGridHead>
                        <RangeCalendarGridRow>
                          <RangeCalendarHeadCell
                            v-for="day in weekDays"
                            :key="day"
                            class="w-full"
                          >
                            {{ day }}
                          </RangeCalendarHeadCell>
                        </RangeCalendarGridRow>
                      </RangeCalendarGridHead>
                      <RangeCalendarGridBody>
                        <RangeCalendarGridRow
                          v-for="(weekDates, index) in secondMonth.rows"
                          :key="`weekDate-${index}`"
                          class="mt-2 w-full"
                        >
                          <RangeCalendarCell
                            v-for="weekDate in weekDates"
                            :key="weekDate.toString()"
                            :date="weekDate"
                          >
                            <RangeCalendarCellTrigger
                              :day="weekDate"
                              :month="secondMonth.value"
                            />
                          </RangeCalendarCell>
                        </RangeCalendarGridRow>
                      </RangeCalendarGridBody>
                    </RangeCalendarGrid>
                  </div>
                </div>
              </RangeCalendarRoot>
            </PopoverContent>
          </Popover>
          <Button @click="fetchHistoricalData">Analyze</Button>
        </div>

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

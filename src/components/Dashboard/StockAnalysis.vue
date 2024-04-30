<script setup lang="ts">
import { reactive } from "vue";

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

const startDate = new Date("2016-01-10").getTime();
const endDate = new Date("2018-02-20").getTime();
const numPoints = 100;
const min = 0;
const max = 100;

const series = reactive([
  {
    data: generateTimeSeriesData(startDate, endDate, numPoints, min, max),
  },
]);

function generateTimeSeriesData(
  startDate: number,
  endDate: number,
  numPoints: number,
  min: number,
  max: number
): { x: number; y: number }[] {
  const data: { x: number; y: number }[] = [];
  const timeInterval = (endDate - startDate) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const timestamp = startDate + i * timeInterval;
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    data.push({ x: new Date(timestamp).getTime(), y: value });
  }

  return data;
}
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

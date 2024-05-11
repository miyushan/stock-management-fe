<script setup lang="ts">
import { ref, reactive } from "vue";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { onMounted } from "vue";
import { Plus as PlusIcon } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormDialog from "@/components/Dashboard/AddStockRecordDialog.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type StockType = {
  ID: number;
  company_id: number;
  date: string;
  quantity: number;
  price: number;
};

const fetchedStocks: StockType[] = reactive([]);

const loading = ref(false);
const error = ref<string | null>(null);

onMounted(fetchCompaniesForSelect);

async function fetchCompaniesForSelect() {
  loading.value = true;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user-stock/`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
        },
      }
    );
    fetchedStocks.push(...response.data);
  } catch (err) {
    error.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="flex flex-col min-h-full gap-4 lg:gap-6">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold md:text-2xl">Purchased Stocks</h1>

      <Dialog>
        <DialogTrigger>
          <Button size="sm"
            ><PlusIcon class="w-4 h-4 mr-2" />Add Stock Record</Button
          >
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle class="text-center">Add Stock Record</DialogTitle>
          </DialogHeader>
          <FormDialog />
        </DialogContent>
      </Dialog>
    </div>
    <div class="flex-1 p-6 rounded-lg border border-dashed shadow-sm">
      <Table class="w-full max-w-2xl m-auto">
        <TableHeader>
          <TableRow>
            <TableHead class="text-right"> ID </TableHead>
            <TableHead class="text-right"> Company ID </TableHead>
            <TableHead class="text-right"> Purchased Date </TableHead>
            <TableHead class="text-right"> Quantity </TableHead>
            <TableHead class="text-right"> Price </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="stock in fetchedStocks" :key="stock.ID">
            <TableCell class="text-right">
              {{ stock.ID }}
            </TableCell>
            <TableCell class="text-right font-medium">{{
              stock.company_id
            }}</TableCell>
            <TableCell class="text-right">{{
              stock.date.split("T")[0]
            }}</TableCell>
            <TableCell class="text-right">{{ stock.quantity }}</TableCell>
            <TableCell class="text-right">
              {{ stock.price }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

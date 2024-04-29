<template>
  <Header></Header>
  <Button>Click me</Button>
</template>

<script>
import Header from "@/components/Header.vue";
import { Button } from "@/components/ui/button";

export default {
  name: "Dashboard",
  components: {
    Header,
    Button,
  },
};
</script>

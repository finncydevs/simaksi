<script setup>
import { RouterLink, RouterView } from "vue-router";
import BottomNav from "./components/BottomNav.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main>
    <RouterView />
  </main>
  <footer>
    <!-- <Footer /> -->
    <BottomNav />
  </footer>
</template>

<style scoped>
main {
  padding-bottom: 37px;
}
</style>

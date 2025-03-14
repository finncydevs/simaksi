<template>
  <section
    class=" flex justify-start flex-col items-center min-h-screen p-4 bg-dark"
  >
    <div class="bg-light rounded-lg shadow-md p-6 max-w-lg w-full">
      <h1 class="text-3xl text-dark font-semibold text-center mb-2">
        Informasi Pengumuman
      </h1>
      <p class="text-primary text-center">
        {{ pengumuman }}
      </p>
    </div>
    <div class="bg-light rounded-lg shadow-md p-6 m-4 w-[80%]">
      <h1 class="text-3xl text-dark font-semibold text-center mb-2">
        Informasi Kecelakaan
      </h1>
      <p class="text-primary text-center">
      </p>
    </div>
  </section>
  <footer></footer>
</template>
<script setup>
import { ref } from "vue";

// Ambil string dari localStorage
const storedPengumuman = localStorage.getItem("pengumuman");
const parsed = storedPengumuman ? JSON.parse(storedPengumuman) : { pengumuman: "Belum ada pengumuman" };

const pengumuman = ref(parsed.pengumuman);
</script>

<style></style>

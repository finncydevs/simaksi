<template>
  <section class="flex justify-center background">
    <div class="text-neutral-content w-full min-h-screen">
      <div class="card-body items-center text-center">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-semibold text-white">
          Selamat Datang di Gepangku! <br />
          Pendaftaran online
        </h2>
        <div class="flex items-center justify-center py-4">
          <div class="bg-teks p-2 rounded-lg shadow-md">
            <h1 class="text-dark text-md font-sm">
              Sisa Kuota Tanggal 18 Februari 2025<br />
              Gunung Putri: {{ sisaKuota }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Konversi parsing ke number
let storedKuota = localStorage.getItem("kuota");
let deKuota = 0;
if (storedKuota) {
  try {
    const parsed = JSON.parse(storedKuota);
    deKuota = Number(parsed.gnPutri) || 0;
    console.log("Kuota admin (deKuota):", deKuota);
  } catch (e) {
    deKuota = Number(storedKuota) || 0;
  }
}

// Variabel reaktif untuk sisa kuota
const sisaKuota = ref(deKuota);

// Fungsi untuk mengambil data pendakis dari API dan menghitung sisa kuota
const fetchPendakis = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/pendakis");
    const countPendakis = response.data.pendakis.length;
    console.log(countPendakis, "pendaki terdaftar");
    sisaKuota.value = deKuota - countPendakis;
    console.log("Sisa Kuota:", sisaKuota.value);
  } catch (error) {
    console.error("Gagal mengambil data pendakis:", error);
  }
};

onMounted(() => {
  fetchPendakis();
});
</script>

<style>
.background {
  background-image: url("https://asset.kompas.com/crops/ay0NtLh9ubfDEELh1LLG6fwDHIU=/5x0:1000x663/750x500/data/photo/2020/10/20/5f8eb67f00b85.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<template>
  <section>
    <div class="container mx-auto px-5 py-10">
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-2xl font-semibold text-dark dark:text-light">Pemandu</h1>
        <button
          class="btn bg-dark focus:outline-none text-light text-sm font-semibold rounded-lg p-2.5"
        >
          Tambah
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="pemandu in pemandus" :key="pemandu._id" class="card card-side bg-base-100 shadow-xl">
          <figure>
            <img :src="` ${pemandu.photo}.webp`" alt="Pemandu" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ pemandu.name }}</h2>
            <p>{{ pemandu.phone }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Hire</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from "vue";
const url = "http://localhost:5000/api/pemandus";
const pemandus = ref([]);
const addModal = ref(null);
import axios from "axios";


const getPemandus = async () => {
  try {
    const response = await axios.get(url);
    if (response.data && response.data.pemandu) {
      pemandus.value = response.data.pemandu;
    }
    console.log(pemandus.value);
    console.log()
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPemandus();
});
</script>

<style></style>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Atur Kuota Pendakian</h2>
    <form @submit.prevent="simpanKuota">
      <label class="block">Gunung Putri:</label>
      <input
        v-model="kuota.gnPutri"
        type="number"
        class="border p-2 w-full mb-2"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan Kuota
      </button>
    </form>
    <form @submit.prevent="pengumuman">
      <label class="block">Pengumuman teks</label>
      <input
        v-model="penguTeks.pengumuman"
        type="text"
        class="border p-2 w-full mb-2"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan Kuota
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const kuota = ref({
  gnPutri: 0,
});

const penguTeks = ref({
  pengumuman: "Tidak ada pengumuman",
});

// Ambil data kuota dari localStorage saat halaman admin dibuka
onMounted(() => {
  const storedKuota = localStorage.getItem("kuota");
  if (storedKuota) {
    kuota.value = JSON.parse(storedKuota);
    console.log("Kuota dari localStorage:", kuota.value);
  }
});

// Simpan kuota ke localStorage
const simpanKuota = () => {
  localStorage.setItem("kuota", JSON.stringify(kuota.value));
  toast.success("Kuota berhasil disimpan");
  console.log("Simpan kuota:", kuota.value);
};

// Simpan kuota ke localStorage
const pengumuman = () => {
  localStorage.setItem("pengumuman", JSON.stringify(penguTeks.value));
  toast.success("Pengumuman teks berhasil diUpdate");
  console.log("Simpan kuota:", penguTeks.value);
};
</script>

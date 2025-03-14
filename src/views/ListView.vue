<template>
  <section class="background h-min-screen flex flex-col items-center justify-start px-4 pt-8">
    <div class="container mx-auto min-h-screen">
      <ClipLoader
        v-if="loading"
        color="#2563EB"
        size="50px"
        class="flex justify-center items-center"
      />
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-2xl lg:text-4xl font-semibold text-white">Daftar</h1>
      </div>

      <div v-if="errorMessage" class="text-red-500 mt-3">
        {{ errorMessage }}
      </div>

      <div v-if="pendakis.length > 0" class="mt-5">
        <table class="w-full table table-zebra ring-2 overflow-scroll ring-primary bg-slate-900 rounded-lg">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Asal Kota</th>
              <th>Tanggal Masuk</th>
              <th>Tanggal Daki</th>
              <th>Jaminan</th>
              <th>Pemandu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pendaki in pendakis" :key="pendaki._id">
              <td>{{ pendaki.nama }}</td>
              <td>{{ pendaki.email }}</td>
              <td>{{ pendaki.gender }}</td>
              <td>{{ pendaki.alamat }}</td>
              <td>{{ formatTanggal(pendaki.tanggalMasuk) }}</td>
              <td>{{ formatTanggal(pendaki.tanggalDaki) }}</td>
              <td>
                <img
                  v-if="pendaki.ktpKartuPelajar"
                  :src="`http://localhost:5000${pendaki.ktpKartuPelajar}`"
                  class="w-12 h-12 object-cover rounded-md cursor-pointer"
                  @click="openImageModal(`http://localhost:5000${pendaki.ktpKartuPelajar}`)"
                  alt="Jaminan"
                />
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="pendaki.pemandu === 'Ya'">Ya</span>
                <span v-else>Tidak</span>
              </td>
              <td>
                <button class="btn bg-light text-dark p-2.5" @click="openEditModal(pendaki)">
                  Edit
                </button>
                <button class="btn bg-danger text-light p-2.5" @click="openDeleteModal(pendaki._id)">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="mt-5 text-gray-400">Tidak ada data pendaki.</div>
    </div>
  </section>

  <!-- Edit Modal -->
  <dialog ref="editModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Edit Pendaki</h3>
      <form @submit.prevent="confirmEdit">
        <input v-model="editPendaki.nama" class="input" placeholder="Nama" />
        <input v-model="editPendaki.email" class="input" placeholder="Email" />
        <input v-model="editPendaki.gender" class="input" placeholder="Gender" />
        <input v-model="editPendaki.alamat" class="input" placeholder="Asal Kota" />
        <input v-model="editPendaki.tanggalMasuk" type="date" class="input" />
        <input v-model="editPendaki.tanggalDaki" type="date" class="input" />
        <input v-model="editPendaki.pemandu" type="text" class="input" />
        <div class="modal-action">
          <button class="btn" type="button" @click="closeEditModal">Cancel</button>
          <button class="btn bg-green-600 text-white" type="submit">Simpan</button>
        </div>
      </form>
    </div>
  </dialog>

  <!-- Delete Modal -->
  <dialog ref="deleteModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Apakah Kamu yakin?</h3>
      <p class="py-4">Ini tidak bisa diulang</p>
      <div class="modal-action">
        <button class="btn" @click="closeDeleteModal">Cancel</button>
        <button class="btn bg-red-600 text-white" @click="confirmDelete">Delete</button>
      </div>
    </div>w
  </dialog>

  <!-- Image Modal -->
  <dialog ref="imageModal" class="modal">
    <div class="modal-box max-w-4xl">
      <img :src="modalImageSrc" class="w-full object-contain" alt="Gambar Besar" />
      <div class="modal-action">
        <button class="btn" @click="closeImageModal">Tutup</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const url = "http://localhost:5000/api/pendakis";
const pendakis = ref([]);
const errorMessage = ref("");
const loading = ref(true);

const editModal = ref(null);
const deleteModal = ref(null);
const imageModal = ref(null);

const editPendaki = ref({});
const pendakiToDelete = ref(null);
const modalImageSrc = ref(""); // Untuk gambar di modal

const getPendakis = async () => {
  try {
    const response = await axios.get(url);
    if (response.data && response.data.pendakis) {
      pendakis.value = response.data.pendakis;
    } else {
      errorMessage.value = "Format data tidak sesuai.";
    }
  } catch (error) {
    toast.error("Gagal memuat data pendaki.");
    errorMessage.value = "Gagal memuat data pendaki.";
  } finally {
    loading.value = false;
  }
};

const openEditModal = (pendaki) => {
  editPendaki.value = { ...pendaki };
  editModal.value.showModal();
};

const closeEditModal = () => {
  editPendaki.value = {};
  editModal.value.close();
};

const confirmEdit = async () => {
  try {
    await axios.put(`${url}/${editPendaki.value._id}`, editPendaki.value);
    getPendakis();
    editModal.value.close();
    toast.success("Berhasil mengupdate data pendaki.");
  } catch (error) {
    toast.error("Gagal mengupdate data pendaki.");
  }
};

const openDeleteModal = (id) => {
  pendakiToDelete.value = id;
  deleteModal.value.showModal();
};

const closeDeleteModal = () => {
  pendakiToDelete.value = null;
  deleteModal.value.close();
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${url}/${pendakiToDelete.value}`);
    getPendakis();
    deleteModal.value.close();
    toast.success("Berhasil menghapus data pendaki.");
  } catch (error) {
    toast.error("Gagal menghapus data pendaki.");
  }
};

const formatTanggal = (tanggal) => {
  return tanggal ? dayjs(tanggal).format("DD-MM-YYYY") : "-";
};

// Fungsi untuk membuka modal gambar besar
const openImageModal = (imageUrl) => {
  modalImageSrc.value = imageUrl;
  imageModal.value.showModal();
};

const closeImageModal = () => {
  modalImageSrc.value = "";
  imageModal.value.close();
};

onMounted(() => {
  getPendakis();
});
</script>

<style scoped>
.input-field {
  background-color: #020713;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}

/* Contoh styling untuk modal, bisa disesuaikan */
.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

<template>
  <section
    class="pt-8 flex flex-row items-start justify-center min-h-screen px-4 background"
  >
    <!-- Tata Cara Pembayaran di Kiri -->
    <div
      class="w-1/2 flex flex-col justify-start items-start p-8 bg-dark rounded-l-lg"
    >
      <h2 class="text-2xl font-bold text-light mb-4">Tata Cara Pembayaran</h2>
      <p class="text-teks">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore minima
        in voluptas soluta ea, provident facilis odit eaque mollitia nesciunt
        tenetur vel reprehenderit facere atque explicabo consequuntur fugiat
        fuga tempore rem corrupti.
      </p>
    </div>

    <!-- Formulir Pendaftaran di Kanan -->
    <div
      class="w-1/2 flex flex-col justify-start items-start p-8 bg-primary rounded-r-lg"
    >
      <h3 class="text-lg font-bold text-teks mb-4">Daftar Pendakian</h3>
      <form @submit.prevent="savePendaki" class="w-full">
        <div v-for="(label, key) in formLabels" :key="key" class="mb-5">
          <label :for="key" class="block mb-2 text-sm font-medium text-teks">
            {{ label }}
          </label>
          <input
            v-if="
              key !== 'gender' && key !== 'pemandu' && key !== 'ktpKartuPelajar'
            "
            v-model="form[key]"
            :type="
              key.includes('tanggal')
                ? 'date'
                : key === 'umur'
                ? 'number'
                : 'text'
            "
            :id="key"
            class="input-field"
            required
          />
          <select
            v-else-if="key === 'gender'"
            v-model="form[key]"
            :id="key"
            class="input-field"
          >
            <option value="Laki Laki">Laki Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <select
            v-else-if="key === 'pemandu'"
            v-model="form[key]"
            :id="key"
            class="input-field"
          >
            <option value="Tidak">Tidak</option>
            <option value="Ya">Ya</option>
          </select>
          <div v-else class="flex flex-col">
            <input
              type="file"
              :id="key"
              class="input-field"
              @change="handleFileUpload"
              accept=".jpg, .jpeg, .png, .pdf"
              required
            />
            <p v-if="form.ktpKartuPelajar" class="text-sm text-light mt-2">
              File terpilih: {{ form.ktpKartuPelajar.name }}
            </p>
          </div>
        </div>

        <!-- Tombol Submit -->
        <div class="mb-5 flex justify-center">
          <button
            type="submit"
            class="bg-light text-dark font-semibold rounded-lg w-1/2 p-2.5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const form = reactive({
  nama: "",
  email: "",
  phone: "",
  alamat: "",
  umur: null,
  gender: "",
  tanggalMasuk: "",
  tanggalDaki: "",
  ktpKartuPelajar: null,
  pemandu: "Tidak",
});

const formLabels = {
  nama: "Nama",
  email: "Email",
  phone: "Nomor Telepon",
  alamat: "Alamat",
  umur: "Umur",
  gender: "Gender",
  tanggalMasuk: "Tanggal Masuk",
  tanggalDaki: "Tanggal Daki",
  ktpKartuPelajar: "Upload KTP atau Kartu Pelajar",
  pemandu: "Pakai Pemandu",
};

// Menangani unggah file
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.ktpKartuPelajar = file;
  } else {
    form.ktpKartuPelajar = null;
  }
};

// Menyimpan data pendaftaran dan mengunggah file
const savePendaki = async () => {
  if (
    !form.nama ||
    !form.email ||
    !form.phone ||
    !form.alamat ||
    !form.umur ||
    !form.gender ||
    !form.tanggalMasuk ||
    !form.tanggalDaki ||
    !form.pemandu
  ) {
    toast.error("Semua kolom harus diisi.");
    return;
  }

  try {
    // 1️⃣ Simpan data pendaftaran dulu
    const response = await axios.post(
      "http://localhost:5000/api/pendakis",
      form,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      const pendakiId = response.data._id; // Ambil ID dari respons backend
      toast.success("Data pendaki berhasil disimpan.");

      // 2️⃣ Jika ada file, unggah file menggunakan ID pendaki
      if (form.ktpKartuPelajar) {
        await uploadFile(pendakiId);
      }

      // 3️⃣ Reset form setelah berhasil
      Object.assign(form, {
        nama: "",
        email: "",
        phone: "",
        alamat: "",
        umur: "",
        gender: "",
        tanggalMasuk: "",
        tanggalDaki: "",
        ktpKartuPelajar: null,
        pemandu: "Tidak",
      });
    }
  } catch (error) {
    console.error("Error saving pendaki:", error);
    toast.error("Gagal menyimpan data pendaki.");
  }
};

// Fungsi untuk unggah file setelah mendapatkan ID
const uploadFile = async (pendakiId) => {
  const file = form.ktpKartuPelajar;
  if (!file) return;

  const formData = new FormData();
  formData.append("ktpKartuPelajar", file);

  try {
    const url = `http://localhost:5000/api/pendakis/upload/${pendakiId}`;
    console.log("Uploading file to:", url);
    const response = await axios.post(url,formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);

    if (response.status === 200) {
      toast.success("File berhasil diunggah.");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Gagal mengunggah file.");
  }
};
</script>

<style>
.input-field {
  background-color: #020713;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}
</style>

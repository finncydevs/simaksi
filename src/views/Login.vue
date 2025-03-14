<script setup></script>

<template>
  <section class="bg-dark">
    <div
      class="bg min-h-screen flex items-center justify-center px-4 text-primary"
    >
      <div
        class="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
      >
        <div class="w-full md:w-1/2 p-6 bg-dark flex flex-col items-center">
          <h1 class="text-3xl font-bold mb-6 text-light">Login Admin</h1>
          <input
            class="w-full p-3 border rounded-lg mb-4 bg-white"
            placeholder="Email"
          />
          <input
            class="w-full p-3 border rounded-lg mb-4 bg-white"
            type="password"
            placeholder="Password"
          />
          <button
            class="w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary transition"
          >
            Login
          </button>
        </div>
        <div class="w-full md:w-1/2">
          <img
            src="../assets/imgs/bromo.jpg"
            class="image-cover"
            alt="Background Image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg {
  background-image: url("../assets/imgs/bromo.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.image-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

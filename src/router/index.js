import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InformasiView from "@/views/InformasiView.vue";
import DaftarView from "@/views/DaftarView.vue";
import Login from "@/views/Login.vue";
import ListView from "@/views/ListView.vue";
import PemanduView from "@/views/PemanduView.vue";
import AdminView from "@/views/AdminView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/informasi",
      name: "informasi",
      component: InformasiView,
    },
    {
      path: "/daftar",
      name: "daftar",
      component: DaftarView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/listPendaki",
      name: "listPendaki",
      component: ListView,
    },
    {
      path: "/pemandu",
      name: "pemandu",
      component: PemanduView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
  ],
});

export default router;

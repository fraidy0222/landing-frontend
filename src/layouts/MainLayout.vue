<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div @click="router.push({ path: '/administracion' })">
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            Title
          </div>
        </q-toolbar-title>

        <div class="q-mr-sm">{{ store.user?.name }}</div>
        <q-btn color="primary text-white" icon="mdi-cog" round flat>
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable @click="store.logout">
                <q-item-section>Cerrar Sesion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered v-model="leftDrawerOpen">
      <ListLinks :menuList="menuList" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ListLinks from "src/components/List/ListLinks.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "src/stores/auth-store";

const leftDrawerOpen = ref(true);

const router = useRouter();
const store = authStore();

const menuList = [
  {
    icon: "home",
    label: "Inicio",
    path: "/adminisracion",
  },
  {
    icon: "web",
    label: "Página Web",
    target: "_blank",
    path: "/",
  },
  {
    icon: "manage_accounts",
    label: "Usuarios",
    path: "/usuarios",
    role: ["Administrador"],
  },
  {
    icon: "house",
    label: "Empresa",
    path: "/empresa",
    role: ["Editor"],
  },
  {
    icon: "newspaper",
    label: "Social OK",
    children: [
      { label: "Noticias", path: "/noticias" },
      { label: "Categorias", path: "/noticias-categorias" },
      { label: "Estados", path: "/noticias-estados" },
    ],
  },
  {
    icon: "quiz",
    label: "Preguntas Frecuentes OK",
    path: "/preguntas-frecuentes",
  },
  {
    icon: "link",
    label: "Pie de Página OK",
    children: [
      { label: "Enlaces de Interés", path: "/enlaces-interes" },
      { label: "Categorías", path: "/enlaces-categorias" },
    ],
  },
  {
    icon: "comment",
    label: "Comentarios OK",
    children: [{ label: "Noticias", path: "/comentarios-noticias" }],
  },
  {
    icon: "handshake",
    label: "Socios OK",
    path: "/socios",
  },
  {
    icon: "apps",
    label: "Servicios OK",
    path: "/servicios",
  },
  {
    icon: "group",
    label: "Directivos OK",
    path: "/directivos",
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

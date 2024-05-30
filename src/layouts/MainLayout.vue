<template>
  <div v-if="getUserLoading"></div>
  <q-layout v-else view="hHh Lpr lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div
            @click="router.push({ path: '/administracion' })"
            class="tw-cursor-pointer"
          >
            Administración
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

    <q-drawer show-if-above bordered v-model="leftDrawerOpen">
      <ListLinks :menuList="menuList" :check-role="checkRole" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ListLinks from "src/components/List/ListLinks.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

const leftDrawerOpen = ref(true);
const router = useRouter();
const store = authStore();
const $q = useQuasar();

onMounted(() => {
  store.getUser();
});

const getUserLoading = computed(() => {
  if (store.isLoadingUser) {
    return $q.loading.show({
      message: "Cargando. Por favor espere...",
    });
  } else {
    $q.loading.hide();
    return false;
  }
});

const menuList = [
  {
    icon: "home",
    label: "Inicio",
    path: "/administracion",
    role: ["Administrador", "Editor"],
  },
  {
    icon: "web",
    label: "Página Web",
    target: "_blank",
    path: "/",
    role: ["Administrador", "Editor"],
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
    role: ["Editor"],
    children: [
      { label: "Noticias", path: "/noticias", role: ["Editor"] },
      { label: "Categorias", path: "/noticias-categorias", role: ["Editor"] },
      { label: "Estados", path: "/noticias-estados", role: ["Editor"] },
    ],
  },
  {
    icon: "quiz",
    label: "Preguntas Frecuentes OK",
    path: "/preguntas-frecuentes",
    role: ["Editor"],
  },
  {
    icon: "link",
    label: "Pie de Página OK",
    role: ["Editor"],
    children: [
      {
        label: "Enlaces de Interés",
        path: "/enlaces-interes",
        role: ["Editor"],
      },
      { label: "Categorías", path: "/enlaces-categorias", role: ["Editor"] },
    ],
  },
  {
    icon: "comment",
    label: "Comentarios OK",
    role: ["Editor"],
    children: [
      { label: "Noticias", path: "/comentarios-noticias", role: ["Editor"] },
    ],
  },
  {
    icon: "handshake",
    label: "Socios OK",
    path: "/socios",
    role: ["Editor"],
  },
  {
    icon: "apps",
    label: "Servicios OK",
    path: "/servicios",
    role: ["Editor"],
  },
  {
    icon: "group",
    label: "Directivos OK",
    path: "/directivos",
    role: ["Editor"],
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function checkRole(value) {
  if (value.includes(store.authUser?.role)) {
    return true;
  }
  return false;
}
</script>

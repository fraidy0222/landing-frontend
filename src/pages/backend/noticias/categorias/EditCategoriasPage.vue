<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Editar Noticia </q-card-section>
      <q-card-section>
        <q-form @submit="updateCategoria">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <!-- <q-input
                outlined
                v-model="form.descripcion"
                label="Descripción"
                type="text"
              /> -->
              <q-editor v-model="form.descripcion" min-height="5rem" />
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/noticias-categorias' })"
            type="button"
            color="negative"
            class="text-white q-mr-sm"
          >
            <q-icon name="arrow_circle_left" class="q-mr-sm"></q-icon>
            Volver
          </q-btn>
          <q-btn
            type="submit"
            color="primary"
            class="text-white"
            :loading="isLoading"
            :disable="isLoading"
          >
            <q-icon name="save" class="q-mr-sm"></q-icon>
            Editar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { data } from "autoprefixer";
import rules from "src/utils/rules";

const $q = useQuasar();
const router = useRouter();
const categoria_id = router.currentRoute.value.params.id;
const isLoading = ref(false);

const form = ref({
  nombre: "",
  descripcion: "",
});

onMounted(() => {
  getCategorias();
});
const getCategorias = () => {
  api.get("/api/categoryNew/" + categoria_id).then((response) => {
    form.value = response.data;
  });
};

const updateCategoria = () => {
  isLoading.value = true;
  api
    .put("/api/categoryNew/" + categoria_id + "/", form.value)
    .then((response) => {
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });

      isLoading.value = false;
      router.push({ path: "/noticias-categorias" });
    })
    .catch((error) => {
      if (error.response.data) {
        for (let i in error.response.data.errors) {
          $q.notify({
            type: "negative",
            message: error.response.data.errors[i],
            position: "top-right",
            progress: true,
          });
        }
      }
      isLoading.value = false;
    });
};
</script>

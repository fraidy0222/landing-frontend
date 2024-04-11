<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Categoría </q-card-section>
      <q-card-section>
        <q-form @submit="storeCategoria">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
              />
            </div>
            <div class="col-12">
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
            Guardar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";

const $q = useQuasar();
const router = useRouter();
const isLoading = ref(false);

const form = ref({
  nombre: "",
  descripcion: "",
});

const storeCategoria = () => {
  isLoading.value = true;
  api
    .post("/api/categoryNew", form.value)
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

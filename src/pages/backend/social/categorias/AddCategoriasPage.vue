<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Categoría </q-card-section>
      <q-card-section>
        <q-form @submit="storeCategoria">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-md-6">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input
                outlined
                v-model="form.descripcion"
                label="Descripción"
                type="text"
                lazy-rules
              />
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
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const router = useRouter();
const isLoading = ref(false);
const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre: "",
  descripcion: "",
});

const storeCategoria = () => {
  isLoading.value = true;
  api
    .post("/api/categoryNew", form.value)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoading.value = false;
      router.push({ path: "/noticias-categorias" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

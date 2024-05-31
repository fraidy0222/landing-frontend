<template>
  <div
    v-if="isLoadingCategoria"
    class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center tw-h-screen"
  >
    <div>
      <q-spinner-cube color="primary" size="4em" />
    </div>
    <div class="tw-text-lg">Cargando. Por favor espere...</div>
  </div>

  <div v-else class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Editar Noticia </q-card-section>
      <q-card-section>
        <q-form @submit="updateCategoria">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-12">
              <q-editor
                v-model="form.descripcion"
                min-height="5rem"
                placeholder="Descripción"
                style="font-size: 16px"
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
            Editar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const router = useRouter();
const categoria_id = router.currentRoute.value.params.id;
const isLoading = ref(false);
const isLoadingCategoria = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre: "",
  descripcion: "",
});

onMounted(() => {
  getCategorias();
});
const getCategorias = () => {
  isLoadingCategoria.value = true;
  api
    .get("/api/categoryNew/" + categoria_id)
    .then((response) => {
      form.value = response.data;
      isLoadingCategoria.value = false;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingCategoria.value = false;
    });
};

const updateCategoria = () => {
  isLoading.value = true;
  api
    .put("/api/categoryNew/" + categoria_id + "/", form.value)
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

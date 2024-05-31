<template>
  <div
    v-if="isLoadingEstado"
    class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center tw-h-screen"
  >
    <div>
      <q-spinner-cube color="primary" size="4em" />
    </div>
    <div class="tw-text-lg">Cargando. Por favor espere...</div>
  </div>

  <div v-else class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Editar Estado </q-card-section>
      <q-card-section>
        <q-form @submit="updateEstado">
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
              <q-input
                outlined
                v-model="form.descripcion"
                label="Descripción"
                type="text"
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/noticias-estados' })"
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
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";
import rules from "src/utils/rules";

const router = useRouter();
const estado_id = router.currentRoute.value.params.id;
const isLoading = ref(false);
const isLoadingEstado = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre: "",
  descripcion: "",
});

onMounted(() => {
  getEstado();
});

const getEstado = () => {
  isLoadingEstado.value = true;
  api
    .get("/api/estadoNew/" + estado_id)
    .then((response) => {
      form.value = response.data;
      isLoadingEstado.value = false;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingEstado.value = false;
    });
};

const updateEstado = () => {
  isLoading.value = true;
  api
    .put("/api/estadoNew/" + estado_id, form.value)
    .then((response) => {
      successNotifyConfig(response.data.message);
      router.push({ path: "/noticias-estados" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

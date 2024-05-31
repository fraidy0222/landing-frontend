<template>
  <div
    v-if="isLoadingEnlaceInteres"
    class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center tw-h-screen"
  >
    <div>
      <q-spinner-cube color="primary" size="4em" />
    </div>
    <div class="tw-text-lg">Cargando. Por favor espere...</div>
  </div>

  <div v-else class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Editar Enlace de Inerés </q-card-section>
      <q-card-section>
        <q-form @submit="updateEnlaceInteres">
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
                v-model="form.enlace"
                label="Dirección URL"
                type="text"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                outlined
                v-model="selectCategoria"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione una categoría"
                option-value="id"
                option-label="nombre"
                :options="categorias"
                :rules="[rules.requiredSelect]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No existen elementos
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/enlaces-interes' })"
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
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import handleHttpRequest from "src/composables/handleHttpRequest";
import { successNotifyConfig } from "src/utils/notification/notification";

const router = useRouter();
const enlace_id = router.currentRoute.value.params.id;
const categorias = ref([]);
const selectCategoria = ref(null);
const isLoading = ref(false);
const isLoadingEnlaceInteres = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre: "",
  enlace: "",
});

onMounted(() => {
  getEnlaceInteres();
  getCategorias();
});

const getEnlaceInteres = () => {
  isLoadingEnlaceInteres.value = true;
  api
    .get(`/api/enlaces/` + enlace_id)
    .then((response) => {
      isLoadingEnlaceInteres.value = false;
      form.value = response.data.enlace;
      selectCategoria.value = response.data.categoria;
    })
    .catch((error) => {
      isLoadingEnlaceInteres.value = false;
      handleErrors(error);
    });
};

const getCategorias = () => {
  api
    .get("/api/categorylink")
    .then((response) => {
      categorias.value = response.data.categorias;
    })
    .catch((error) => handleErrors(error));
};

const updateEnlaceInteres = () => {
  isLoading.value = true;
  form.value.categoria_enlace_id = selectCategoria.value.id;
  api
    .put("/api/enlaces/" + enlace_id, form.value)
    .then((response) => {
      isLoading.value = false;
      successNotifyConfig(response.data.message);

      router.push({ path: "/enlaces-interes" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

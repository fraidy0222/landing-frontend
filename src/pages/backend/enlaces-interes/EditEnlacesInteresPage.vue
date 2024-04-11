<template>
  <div class="q-pa-md">
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
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";

const $q = useQuasar();
const router = useRouter();
const enlace_id = router.currentRoute.value.params.id;
const categorias = ref([]);
const selectCategoria = ref(null);
const isLoading = ref(false);

const form = ref({
  nombre: "",
  enlace: "",
});

onMounted(() => {
  getEnlaceInteres();
  getCategorias();
});

const getEnlaceInteres = () => {
  api.get(`/api/enlaces/` + enlace_id).then((response) => {
    console.log(response.data);
    form.value = response.data.enlace;
    selectCategoria.value = response.data.categoria;
  });
};

const getCategorias = () => {
  api
    .get("/api/categorylink")
    .then((response) => {
      categorias.value = response.data.categorias;
    })
    .catch((error) => console.log(error));
};

const updateEnlaceInteres = () => {
  isLoading.value = true;
  form.value.categoria_enlace_id = selectCategoria.value.id;
  api
    .put("/api/enlaces/" + enlace_id, form.value)
    .then((response) => {
      isLoading.value = false;
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });

      router.push({ path: "/enlaces-interes" });
    })
    .catch((error) => {
      if (error.response.data) {
        for (let field in error.response.data.errors) {
          if (Array.isArray(error.response.data.errors[field])) {
            error.response.data.errors[field].forEach((errorMessage) => {
              $q.notify({
                type: "negative",
                message: errorMessage,
                position: "top-right",
                progress: true,
              });
            });
          } else {
            $q.notify({
              type: "negative",
              message: error.response.data.errors[field],
              position: "top-right",
              progress: true,
            });
          }
        }
        isLoading.value = false;
      }
    });
};
</script>

<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Enlace de Interés
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeEnlacesInteres">
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
                hint="http://ejemplo.com"
                :rules="[rules.validUrlNotRequired]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                outlined
                v-model="selectCategoria"
                :options="optionsEnlaces"
                @filter="filterNoticias"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione una categoría"
                option-value="id"
                option-label="nombre"
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
const categorias = ref([]);
const selectCategoria = ref(null);
const isLoading = ref(false);

const { handleErrors } = handleHttpRequest();

const optionsEnlaces = ref(null);

const form = ref({
  nombre: "",
  enlace: "",
});

onMounted(() => {
  getCategorias();
});

function filterNoticias(val, update, abort) {
  if (optionsEnlaces.value !== null) {
    // already loaded
    update();
    return;
  }

  setTimeout(() => {
    update(() => {
      optionsEnlaces.value = categorias.value;
    });
  }, 1000);
}

const getCategorias = () => {
  api
    .get("/api/categorylink/")
    .then((response) => {
      categorias.value = response.data.categorias;
      console.log(categorias.value);
    })
    .catch((error) => {
      handleErrors(error);
    });
};

const storeEnlacesInteres = () => {
  form.value.categoria_enlace_id = selectCategoria.value.id;
  isLoading.value = true;
  api
    .post("/api/enlaces", form.value)
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

<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Noticia </q-card-section>
      <q-card-section>
        <q-form @submit="storeNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-4">
              <q-file
                name="logo"
                outlined
                v-model="form.portada"
                label="Portada"
                clearable
                accept="image/*"
                max-files="1"
                counter
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-select
                outlined
                v-model="selectCategoria"
                :options="optionsCategoria"
                @filter="filterCategoria"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione una categoría"
                option-value="id"
                option-label="nombre"
                emit-value
                map-options
                multiple
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
            <div class="col-xs-12 col-sm-4">
              <q-select
                outlined
                v-model="selectEstado"
                :options="optionsEstado"
                @filter="filterEstado"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione un estado"
                option-value="id"
                option-label="nombre"
                emit-value
                map-options
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
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.titulo"
                label="Título"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.subtitulo"
                label="Subtítulo"
                type="text"
                lazy-rules
              />
            </div>
            <div class="col-xs-12 col-sm-12"></div>
          </div>

          <q-btn
            @click="$router.push({ path: '/noticias' })"
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
import { authStore } from "src/stores/auth-store";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";
import { useQuasar } from "quasar";

const categorias = ref([]);
const selectCategoria = ref(null);
const estados = ref([]);
const selectEstado = ref(null);
const router = useRouter();
const isLoading = ref(false);

const store = authStore();
const { handleErrors } = handleHttpRequest();

const optionsCategoria = ref(null);
const optionsEstado = ref(null);

const form = ref({
  portada: null,
  titulo: "",
  subtitulo: "",
  descripcion: "",
});

onMounted(() => {
  getCategorias();
  getEstadoNoticias();
});

const storeNoticia = () => {
  form.value.estado_id = selectEstado.value;
  form.value.categoria_noticia_id = selectCategoria.value;
  form.value.user_id = store.user.id;

  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    const value = form.value[key];
    if (value !== null && value !== undefined) {
      if (key === "portada") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  isLoading.value = true;
  api
    .post("/api/noticias", formData)
    .then((response) => {
      isLoading.value = false;
      successNotifyConfig(response.data.message);
      router.push({ path: "/noticias" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};

function filterCategoria(val, update, abort) {
  if (optionsCategoria.value !== null) {
    // already loaded
    update();
    return;
  }

  setTimeout(() => {
    update(() => {
      optionsCategoria.value = categorias.value;
    });
  }, 2000);
}

const getCategorias = () => {
  api
    .get("/api/categoryNew/")
    .then((response) => {
      categorias.value = response.data.categoriasNoticias;
    })
    .catch((error) => {
      handleErrors(error);
    });
};

// Estado
function filterEstado(val, update, abort) {
  if (optionsEstado.value !== null) {
    // already loaded
    update();
    return;
  }

  setTimeout(() => {
    update(() => {
      optionsEstado.value = estados.value;
    });
  }, 2000);
}

const getEstadoNoticias = () => {
  api
    .get("/api/estadoNew/")
    .then((response) => {
      estados.value = response.data.estadoNoticias;
    })
    .catch((error) => {
      handleErrors(error);
    });
};
</script>

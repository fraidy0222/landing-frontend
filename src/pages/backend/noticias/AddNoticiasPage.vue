<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Noticia </q-card-section>
      <q-card-section>
        <q-form @submit="storeNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
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
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.descripcion"
                label="Descripción"
                type="text"
                lazy-rules
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
                emit-value
                map-options
                multiple
                clearable
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
              <q-select
                outlined
                v-model="selectEstado"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione un estado"
                option-value="id"
                option-label="nombre"
                :options="estados"
                emit-value
                map-options
                clearable
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
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import { authStore } from "src/stores/auth-store";

const $q = useQuasar();
const categorias = ref([]);
const selectCategoria = ref(null);
const estados = ref([]);
const selectEstado = ref(null);
const router = useRouter();
const isLoading = ref(false);

const store = authStore();

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
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });

      router.push({ path: "/noticias" });
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

const getCategorias = () => {
  api.get("/api/categoryNew/").then((response) => {
    categorias.value = response.data.categoriasNoticias;
  });
};
const getEstadoNoticias = () => {
  api.get("/api/estadoNew/").then((response) => {
    estados.value = response.data.estadoNoticias;
  });
};
</script>

<template>
  <div
    v-if="isLoadingNoticia"
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
        <q-form @submit="updateNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-file
                name="logo"
                outlined
                v-model="form.portada"
                label="Portada"
                clearable
                counter
                accept="image/*"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" /> </template
              ></q-file>
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
            :isLoading="isLoading"
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

const categorias = ref([]);
const selectCategoria = ref([]);
const estados = ref([]);
const selectEstado = ref(null);
const isLoadingNoticia = ref(false);
const isLoading = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  portada: null,
  titulo: "",
  subtitulo: "",
  descripcion: "",
});

const store = authStore();
const router = useRouter();
const noticia_id = router.currentRoute.value.params.id;

onMounted(() => {
  getNoticias();
  getCategorias();
  getEstadoNoticias();
});

const getNoticias = () => {
  isLoadingNoticia.value = true;
  api
    .get("/api/noticias/" + noticia_id)
    .then((response) => {
      isLoadingNoticia.value = false;
      form.value = response.data.noticias;
      selectCategoria.value = response.data.noticias.categorias;
      selectEstado.value = response.data.estadoId[0].estado;
      form.value.portada = null;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingNoticia.value = false;
    });
};

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

const updateNoticia = () => {
  form.value.estado_id = selectEstado.value.id;
  form.value.categorias = selectCategoria.value.map((select) => select.id);
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
    .post("/api/noticias/" + noticia_id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        _method: "PUT",
      },
    })
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
</script>

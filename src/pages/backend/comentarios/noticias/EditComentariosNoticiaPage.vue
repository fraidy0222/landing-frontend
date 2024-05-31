<template>
  <div
    v-if="isLoadingComentario"
    class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center tw-h-screen"
  >
    <div>
      <q-spinner-cube color="primary" size="4em" />
    </div>
    <div class="tw-text-lg">Cargando. Por favor espere...</div>
  </div>

  <div v-else class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Comentario de Noticia
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateComentarioNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.nombre_comentario"
                label="Nombre"
                type="text"
                lazy-rules
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.correo_comentario"
                label="Correo"
                type="text"
                lazy-rules
                :rules="[rules.emailNotRequired]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                outlined
                v-model="selectNoticia"
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione una noticia"
                option-value="id"
                option-label="titulo"
                :options="noticias"
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
            <div class="col-12">
              <q-input
                outlined
                v-model="form.comentario"
                label="Comentario"
                type="text"
                lazy-rules
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/comentarios-noticias' })"
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

const user = authStore();
const noticias = ref([]);
const selectNoticia = ref(null);
const estados = ref([]);
const selectEstado = ref(null);
const router = useRouter();
const isLoading = ref(false);
const isLoadingComentario = ref(false);
const comentario_noticia_id = router.currentRoute.value.params.id;
const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre_comentario: "",
  correo_comentario: "",
  comentario: "",
  creada_por: "",
  estado_id: "",
  noticia_id: "",
});

onMounted(() => {
  getComentariosNoticias();
  getEstadoNoticias();
  getNoticias();
});

const getComentariosNoticias = () => {
  isLoadingComentario.value = true;
  api
    .get(`/api/comentarios/` + comentario_noticia_id)
    .then((response) => {
      form.value = response.data.comentario;
      isLoadingComentario.value = false;
      selectEstado.value = response.data.comentario.estado;
      selectNoticia.value = response.data.comentario.noticia;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingComentario.value = false;
    });
};

const updateComentarioNoticia = () => {
  form.value.user_id = user.user.id;
  form.value.estado_id = selectEstado.value.id;
  form.value.noticia_id = selectNoticia.value.id;

  isLoading.value = true;

  // console.log(form.value);
  api
    .put("/api/comentarios/" + comentario_noticia_id, form.value)
    .then((response) => {
      isLoading.value = false;
      successNotifyConfig(response.data.message);
      router.push({ path: "/comentarios-noticias" });
    })
    .catch((error) => {
      handleErrors(error);

      isLoading.value = false;
    });
};

const getNoticias = () => {
  api
    .get("/api/noticias/")
    .then((response) => {
      noticias.value = response.data.noticias;
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
</script>

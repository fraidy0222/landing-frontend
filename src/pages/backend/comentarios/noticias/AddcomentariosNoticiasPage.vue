<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Comentario de Noticia
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeComentarioNoticia">
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
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import rules from "src/utils/rules";
import { authStore } from "src/stores/auth-store";
import { useRouter } from "vue-router";

const $q = useQuasar();
const user = authStore();
const noticias = ref([]);
const selectNoticia = ref(null);
const estados = ref([]);
const selectEstado = ref(null);
const router = useRouter();
const isLoading = ref(false);

const form = ref({
  nombre_comentario: "",
  correo_comentario: "",
  comentario: "",
  creada_por: "",
  estado_id: "",
  noticia_id: "",
});

onMounted(() => {
  getEstadoNoticias();
  getNoticias();
});

const storeComentarioNoticia = () => {
  form.value.user_id = user.user.id;
  form.value.estado_id = selectEstado.value;
  form.value.noticia_id = selectNoticia.value;

  isLoading.value = true;

  api
    .post("/api/comentarios", form.value)
    .then((response) => {
      isLoading.value = false;
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });

      router.push({ path: "/comentarios-noticias" });
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

const getNoticias = () => {
  api.get("/api/noticias/").then((response) => {
    noticias.value = response.data.noticias;
  });
};

const getEstadoNoticias = () => {
  api.get("/api/estadoNew/").then((response) => {
    estados.value = response.data.estadoNoticias;
  });
};
</script>

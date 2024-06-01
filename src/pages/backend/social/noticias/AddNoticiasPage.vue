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
                transition-show="jump-up"
                transition-hide="jump-up"
                label="Seleccione una categoría"
                option-value="id"
                option-label="nombre"
                :options="categorias"
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
            <div class="col-xs-12 col-sm-12">
              <q-editor
                v-model="form.descripcion"
                :dense="$q.screen.lt.md"
                :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify'],
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify'],
                    },
                  ],
                  [
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                    'subscript',
                    'superscript',
                  ],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code',
                      ],
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7',
                      ],
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana',
                      ],
                    },
                    'removeFormat',
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['viewsource'],
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana',
                }"
              />
              <!-- <q-editor
                v-model="form.descripcion"
                min-height="5rem"
                placeholder="Descripción"
                style="font-size: 16px"
                :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify'],
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify'],
                    },
                  ],
                  [
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                    'subscript',
                    'superscript',
                  ],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code',
                      ],
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7',
                      ],
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana',
                      ],
                    },
                    'removeFormat',
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['viewsource'],
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana',
                }"
              /> -->
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
const $q = useQuasar();

const { handleErrors } = handleHttpRequest();

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
</script>

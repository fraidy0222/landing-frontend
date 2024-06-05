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
        <q-form @submit.prevent="updateNoticia">
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
              <section
                v-if="editor"
                class="tw-flex tw-items-center tw-flex-wrap tw-gap-x-3 tw-border-t tw-border-l tw-border-r tw-border-gray400 tw-p-4"
              >
                <button
                  @click.prevent="editor.chain().focus().toggleBold().run()"
                  :disabled="!editor.can().chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
                >
                  bold
                </button>
                <button
                  @click.prevent="editor.chain().focus().toggleItalic().run()"
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                >
                  italic
                </button>
                <button
                  @click.prevent="
                    editor.chain().focus().toggleUnderline().run()
                  "
                  :class="{ 'is-active': editor.isActive('underline') }"
                >
                  toggleUnderline
                </button>
                <button
                  @click.prevent="setLink"
                  :class="{ 'is-active': editor.isActive('link') }"
                >
                  setLink
                </button>
                <button
                  @click.prevent="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  "
                  :class="{
                    'is-active': editor.isActive('heading', { level: 3 }),
                  }"
                >
                  h3
                </button>
                <button
                  @click.prevent="editor.chain().focus().unsetLink().run()"
                  :disabled="!editor.isActive('link')"
                >
                  unsetLink
                </button>
                <button
                  @click.prevent="
                    editor.chain().focus().toggleOrderedList().run()
                  "
                  :class="{ 'is-active': editor.isActive('orderedList') }"
                >
                  toggleOrderedList
                </button>
                <button
                  @click.prevent="editor.chain().focus().undo().run()"
                  :disabled="!editor.can().chain().focus().undo().run()"
                >
                  undo
                </button>
                <button
                  @click.prevent="editor.chain().focus().redo().run()"
                  :disabled="!editor.can().chain().focus().redo().run()"
                >
                  redo
                </button>
              </section>
              <editor-content :editor="editor" />
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

// TipTap editor
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

const categorias = ref([]);
const selectCategoria = ref([]);
const estados = ref([]);
const selectEstado = ref(null);
const isLoadingNoticia = ref(false);
const isLoading = ref(false);

const { handleErrors } = handleHttpRequest();

const editor = useEditor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  editorProps: {
    attributes: {
      class:
        "tw-border tw-prose tw-border-gray400 tw-p-4 tw-min-h-[12rem] tw-max-h-[12rem] tw-overflow-y-auto tw-outline-none",
    },
  },
  extensions: [
    StarterKit,
    Underline,
    OrderedList,
    ListItem,
    Link.configure({
      protocols: ["ftp", "mailto"],
      autolink: true,
      openOnClick: true,
      validate: (href) => /^https?:\/\//.test(href),
    }),
  ],
});
const optionsCategoria = ref(null);
const optionsEstado = ref(null);

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

// Methods TipTap
function setLink() {
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
}
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  a {
    color: #68cef8;
  }

  code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }
}
</style>

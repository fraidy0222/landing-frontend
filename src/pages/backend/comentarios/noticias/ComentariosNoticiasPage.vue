<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Comentarios de Noticias"
      :rows="comentariosNoticias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-comentario="props">
        <td>
          <div class="tw-w-44 ellipsis">{{ props.row.comentario }}</div>
        </td>
      </template>
      <template v-slot:body-cell-noticia_info="props">
        <td>
          <div>{{ props.row.noticia_info?.titulo }}</div>
        </td>
      </template>
      <template v-slot:body-cell-estado_info="props">
        <td>
          <div>{{ props.row.estado_info?.nombre }}</div>
        </td>
      </template>
      <template v-slot:body-cell-creada_por_info="props">
        <td>
          <div>{{ props.row.creada_por_info?.username }}</div>
        </td>
      </template>
      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/crear-comentario-noticia' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn flat size="md" round icon="more_vert">
              <q-menu
                :offset="[50, 10]"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list dense>
                  <q-item
                    clickable
                    v-close-popup
                    @click="showInfoComentarioNoticiaItem(props.row)"
                  >
                    <q-item-section class="-tw-mr-4">
                      <q-icon color="black" name="visibility" />
                    </q-item-section>

                    <q-item-section class="tw-mr-4">Ver</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      $router.push({
                        path: '/editar-comentario-noticia/' + props.row.id,
                      })
                    "
                  >
                    <q-item-section class="-tw-mr-4">
                      <q-icon color="black" name="edit" />
                    </q-item-section>

                    <q-item-section class="tw-mr-4">Editar</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="checkDelete(props.row)"
                  >
                    <q-item-section class="-tw-mr-4">
                      <q-icon name="delete" />
                    </q-item-section>

                    <q-item-section color="red" class="tw-mr-4"
                      >Eliminar</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <DeleteDialog
      :is-open="isOpenDelete"
      @delete="deleteEstado"
      @closeDialog="isOpenDelete = false"
      :is-delete-loading="isLoadingDelete"
    />

    <q-dialog v-model="isOpenComentarioNoticiaItem">
      <q-card>
        <q-card-section class="tw-border-b">
          <div class="tw-text-xl tw-font-semibold tw-mb-2">Comentario</div>
          <div class="tw-text-md tw-text-gray-700">
            {{ comentariosNoticiasInfo.comentario }}
          </div>
        </q-card-section>
        <div class="tw-text-xl tw-font-semibold tw-my-3 q-px-md">Noticia</div>
        <q-card-section class="q-pt-sm">
          <div class="tw-text-lg tw-font-medium">
            {{ comentariosNoticiasInfo.noticia_info.titulo }}
          </div>
          <div class="text-subtitle2 tw-text-gray-700 tw-mt-2">
            {{ comentariosNoticiasInfo.noticia_info.descripcion }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="tw-relative tw-flex tw-items-center tw-gap-x-4">
            <div>Publica por</div>
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray-900">
                <a>
                  <span class="tw-absolute tw-inset-0" />
                  {{ comentariosNoticiasInfo.creada_por_info.username }}
                </a>
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { api } from "boot/axios";
import { ref, onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "src/components/Dialogs/DialogDelete.vue";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "comentario",
    align: "left",
    label: "Comentario",
    field: "comentario",
    sortable: true,
  },
  {
    name: "nombre_comentario",
    align: "left",
    label: "Nombre",
    field: "nombre_comentario",
    sortable: true,
  },
  {
    name: "correo_comentario",
    align: "left",
    label: "Correo",
    field: "correo_comentario",
    sortable: true,
  },
  {
    name: "noticia_info",
    align: "left",
    label: "Noticia",
    field: "noticia_info",
    sortable: true,
  },
  {
    name: "estado_info",
    align: "left",
    label: "Estado",
    field: "estado_info",
    sortable: true,
  },
  {
    name: "creada_por_info",
    align: "left",
    label: "Creado",
    field: "creada_por_info",
    sortable: true,
  },
  {
    name: "fecha_creacion",
    align: "left",
    label: "Fecha Creación",
    field: "fecha_creacion",
    sortable: true,
  },
  {
    name: "fecha_modificacion",
    align: "left",
    label: "Fecha Modificación",
    field: "fecha_modificacion",
    sortable: true,
  },
  {
    name: "opciones",
    align: "left",
    label: "",
    field: "opciones",
    sortable: false,
  },
];

const isLoading = ref(false);
const isOpenDelete = ref(false);
const isLoadingDelete = ref(false);
const comentariosNoticias = ref([]);
const comentariosNoticiasInfo = ref([]);
const deleteComentarioNoticiaId = ref([]);
const isOpenComentarioNoticiaItem = ref(false);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getComentariosNoticias();
});

const checkDelete = (row) => {
  deleteComentarioNoticiaId.value = row;
  isOpenDelete.value = true;
};

const getComentariosNoticias = () => {
  isLoading.value = true;
  api.get(`/api/comentarios/`).then((response) => {
    isLoading.value = false;
    comentariosNoticias.value = response.data.comentarios;
  });
};

const deleteEstado = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/comentarios/" + deleteComentarioNoticiaId.value.id)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isOpenDelete.value = false;
      isLoadingDelete.value = false;
      getComentariosNoticias();
    })
    .catch((error) => {
      handleErrors(error);
      isOpenDelete.value = false;
      isLoadingDelete.value = false;
    });
};

const showInfoComentarioNoticiaItem = (item) => {
  isOpenComentarioNoticiaItem.value = true;
  comentariosNoticiasInfo.value = item;
};
</script>

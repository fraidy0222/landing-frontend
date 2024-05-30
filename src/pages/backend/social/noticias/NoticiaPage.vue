<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Noticias"
      :rows="noticias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-portada="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img
              :src="props.row.portada"
              style="height: 50px; max-width: 195px"
            />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-titulo="props">
        <td>
          <div class="tw-w-56 ellipsis">{{ props.row.titulo }}</div>
        </td>
      </template>
      <template v-slot:body-cell-subtitulo="props">
        <td>
          <div class="tw-w-52 ellipsis">{{ props.row.subtitulo }}</div>
        </td>
      </template>
      <template v-slot:body-cell-descripcion="props">
        <td>
          <div class="tw-w-52 ellipsis">{{ props.row.descripcion }}</div>
        </td>
      </template>

      <template v-slot:body-cell-fecha_creacion="props">
        <td>
          <div>{{ props.row.fecha_creacion }}</div>
        </td>
      </template>
      <template v-slot:body-cell-fecha_modificacion="props">
        <td>
          <div>{{ props.row.fecha_modificacion }}</div>
        </td>
      </template>
      <template v-slot:body-cell-creada_por_info="props">
        <td>
          <div>{{ props.row.usuario?.name }}</div>
        </td>
      </template>
      <template v-slot:body-cell-estado_info="props">
        <td>
          <div>{{ props.row.estado?.nombre }}</div>
        </td>
      </template>
      <template v-slot:body-cell-categoria_info="props">
        <td>
          <q-badge
            v-for="item in props.row.categorias"
            :key="item.id"
            class="tw-mr-2"
            >{{ item?.nombre }}</q-badge
          >
        </td>
      </template>

      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/crear-noticia' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <button-tooltip
              icon="visibility"
              tooltip="Ver"
              color="primary"
              :flat="true"
              :round="true"
              @click="showNoticiasItem(props.row)"
            />
            <button-tooltip
              icon="edit"
              tooltip="Editar"
              color="warning"
              :flat="true"
              :round="true"
              @click="
                $router.push({
                  path: '/editar-noticia/' + props.row.id,
                })
              "
            />
            <button-tooltip
              icon="delete"
              tooltip="Eliminar"
              color="negative"
              :flat="true"
              :round="true"
              @click="checkDelete(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <DeleteDialog
      :is-open="isOpenDelete"
      @delete="deleteNoticia"
      @closeDialog="isOpenDelete = false"
      :isDeleteLoading="isLoadingDelete"
    />

    <!-- Show Info Noticias -->
    <q-dialog v-model="isOpenNoticiaItem">
      <q-card class="tw-relative">
        <div class="tw-absolute tw-top-2 tw-right-3">
          <q-btn
            icon="close"
            round
            class="tw-bg-white"
            @click="isOpenNoticiaItem = false"
          ></q-btn>
        </div>
        <img :src="noticias[0].portada" :height="200" />
        <div class="row items-center q-mt-xs q-px-md">
          <div class="tw-text-gray700">{{ noticiaItem.fecha_creacion }}</div>
          <div class="row items-center q-ml-md">
            <div
              class="tw-rounded-full tw-text-sm tw-bg-gray200 tw-px-2 tw-py-0.5 tw-font-medium hover:tw-bg-gray100"
            >
              {{ noticias[0].categorias[0].nombre }}
            </div>
          </div>
        </div>
        <q-card-section class="q-pt-sm">
          <div class="text-h6">{{ noticiaItem.titulo }}</div>
          <div class="text-subtitle2 tw-text-gray700 tw-mt-2">
            {{ noticiaItem.descripcion }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="tw-relative tw-flex tw-items-center tw-gap-x-2">
            <div class="tw-text-gray600">Publicado por:</div>
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-medium tw-text-gray800">
                <a>
                  <span class="tw-absolute tw-inset-0" />
                  Usuario
                </a>
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.q-card img {
  height: 400px;
}
</style>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "components/Dialogs/DialogDelete.vue";
import handleHttpRequest from "src/composables/handleHttpRequest";
import ButtonTooltip from "src/components/Buttons/ButtonTooltip.vue";
import { successNotifyConfig } from "src/utils/notification/notification";

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "portada",
    align: "left",
    label: "Portada",
    field: "portada",
    sortable: true,
  },
  {
    name: "titulo",
    align: "left",
    label: "Títtulo",
    field: "titulo",
    sortable: true,
  },
  {
    name: "subtitulo",
    align: "left",
    label: "Subtítulo",
    field: "subtitulo",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "left",
    label: "Descripción",
    field: "descripcion",
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
    name: "creada_por_info",
    align: "left",
    label: "Creada",
    field: "creada_por_info",
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
    name: "categoria_info",
    align: "left",
    label: "Categoría",
    field: "categoria_info",
    sortable: false,
  },
  {
    name: "opciones",
    align: "left",
    label: "Opciones",
    field: "opciones",
    sortable: false,
  },
];

const isLoading = ref(false);
const isOpenDelete = ref(false);
const isLoadingDelete = ref(false);
const noticias = ref([]);
const noticiaItem = ref([]);
const isOpenNoticiaItem = ref(false);
const deleteNoticiaId = ref([]);
const categorias = ref([]);
const estados = ref([]);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getNoticias();
  getCategorias();
  getEstadoNoticias();
});

const getNoticias = () => {
  isLoading.value = true;
  api
    .get("/api/noticias")
    .then((response) => {
      isLoading.value = false;
      noticias.value = response.data.noticias;
    })
    .catch((error) => {
      handleErrors(error);
    });
};
const checkDelete = (row) => {
  deleteNoticiaId.value = row;
  isOpenDelete.value = true;
};

const getCategorias = () => {
  api
    .get("/api/categoryNew/")
    .then((response) => {
      categorias.value = response.data;
    })
    .catch((error) => {
      handleErrors(error);
    });
};
const getEstadoNoticias = () => {
  api
    .get("/api/estadoNew/")
    .then((response) => {
      estados.value = response.data;
    })
    .catch((error) => {
      handleErrors(error);
    });
};

const deleteNoticia = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/noticias/" + deleteNoticiaId.value.id)
    .then((response) => {
      isLoadingDelete.value = false;
      successNotifyConfig(response.data.message);
      isOpenDelete.value = false;
      getNoticias();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
    });
};

const showNoticiasItem = (item) => {
  noticiaItem.value = item;
  isOpenNoticiaItem.value = true;
};
</script>

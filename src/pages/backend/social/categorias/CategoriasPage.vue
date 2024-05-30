<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Categorías"
      :rows="categorias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-descripcion="props">
        <td>
          <div class="tw-w-60 tw-ellipsis tw-text-primary">
            {{ props.row.descripcion }}
          </div>
        </td>
      </template>
      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/crear-noticias-categoria' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <button-tooltip
              icon="edit"
              tooltip="Editar"
              color="warning"
              :flat="true"
              :round="true"
              @click="
                $router.push({
                  path: '/editar-noticias-categoria/' + props.row.id,
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "components/Buttons/ButtonTooltip.vue";
import handleHttpRequest from "src/composables/handleHttpRequest";
import { successNotifyConfig } from "src/utils/notification/notification";

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "nombre",
    align: "left",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "descripción",
    align: "left",
    label: "Descripción",
    field: "descripcion",
    sortable: true,
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
const isLoadingDelete = ref(false);
const isOpenDelete = ref(false);
const categorias = ref([]);
const deleteCategoriaId = ref([]);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getCategorias();
});

const checkDelete = (row) => {
  deleteCategoriaId.value = row;
  isOpenDelete.value = true;
};

const getCategorias = () => {
  isLoading.value = true;
  api
    .get("/api/categoryNew/")
    .then((response) => {
      isLoading.value = false;
      categorias.value = response.data.categoriasNoticias;
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};

const deleteNoticia = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/categoryNew/" + deleteCategoriaId.value.id)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
      getCategorias();
    })
    .catch((error) => {
      handleErrors(error);
      isOpenDelete.value = false;
      isLoadingDelete.value = false;
    });
};
</script>

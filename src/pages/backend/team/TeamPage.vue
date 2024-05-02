<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Directivos"
      :rows="directivos"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/crear-directivo' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img
              :src="props.row.imagen"
              style="height: 50px; max-width: 195px"
            />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-biografia="props">
        <td>
          <div class="tw-w-52 ellipsis">{{ props.row.biografia }}</div>
        </td>
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
                  path: '/editar-directivo/' + props.row.id,
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
      :is-delete-loading="isLoadingDelete"
      @delete="deleteDirectivo"
      @closeDialog="isOpenDelete = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "src/components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "src/components/Buttons/ButtonTooltip.vue";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "imagen",
    align: "left",
    label: "Imagen",
    field: "imagen",
    sortable: true,
  },
  {
    name: "prioridad",
    align: "left",
    label: "Prioridad",
    field: "prioridad",
    sortable: true,
  },
  {
    name: "nombre",
    align: "left",
    label: "Nombre Completo",
    field: "nombre",
    sortable: true,
  },
  {
    name: "cargo",
    align: "left",
    label: "Cargo",
    field: "cargo",
    sortable: true,
  },
  {
    name: "biografia",
    align: "left",
    label: "Biografía",
    field: "biografia",
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
const isOpenDelete = ref(false);
const isLoadingDelete = ref(false);
const directivos = ref([]);
const deleteDirectivosId = ref([]);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getDirectivos();
});

const checkDelete = (row) => {
  deleteDirectivosId.value = row;
  isOpenDelete.value = true;
};

const getDirectivos = () => {
  isLoading.value = true;
  api
    .get("/api/directivos")
    .then((response) => {
      isLoading.value = false;
      directivos.value = response.data.directivos;
    })
    .catch((error) => handleErrors(error));
};

const deleteDirectivo = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/directivos/" + deleteDirectivosId.value.id + "/")
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
      getDirectivos();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
    });
};
</script>

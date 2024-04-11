<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Estados"
      :rows="estados"
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
          <div class="tw-w-60 ellipsis">{{ props.row.descripcion }}</div>
        </td>
      </template>
      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/crear-noticias-estados' })"
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
                  path: '/editar-noticias-estados/' + props.row.id,
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
      @delete="deleteEstado"
      @closeDialog="isOpenDelete = false"
      :isDeleteLoading="isLoadingDelete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "components/Buttons/ButtonTooltip.vue";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { getPaginationLabel, textInfo } = useTable();

const { handleErrors } = handleHttpRequest();

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
const isOpenDelete = ref(false);
const isLoadingDelete = ref(false);
const estados = ref([]);
const deleteEstadoId = ref([]);
const $q = useQuasar();

onMounted(() => {
  getEstados();
});

const checkDelete = (row) => {
  deleteEstadoId.value = row;
  isOpenDelete.value = true;
};

const getEstados = () => {
  isLoading.value = true;
  api.get("/api/estadoNew").then((response) => {
    isLoading.value = false;
    estados.value = response.data.estadoNoticias;
  });
};

const deleteEstado = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/estadoNew/" + deleteEstadoId.value.id)
    .then((response) => {
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
      getEstados();
    })
    .catch((error) => {
      if (error.response.data.error) {
        $q.notify({
          type: "negative",
          message: error.response.data.error,
          position: "top-right",
          progress: true,
        });
      }
      handleErrors(
        error,
        (isLoadingDelete.value = false),
        (isOpenDelete.value = false)
      );
    });
};
</script>

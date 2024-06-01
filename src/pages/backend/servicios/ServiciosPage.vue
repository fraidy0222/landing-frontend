<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Servicios"
      :rows="servicios"
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
          @click="$router.push({ path: '/crear-servicio' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-resumen="props">
        <td>
          <div class="tw-w-40 ellipsis">{{ props.row.resumen }}</div>
        </td>
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
                  path: '/editar-servicio/' + props.row.id,
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
    <DialogDelete
      :is-open="isOpenDelete"
      :is-delete-loading="isLoadingDelete"
      @delete="deleteServicio"
      @closeDialog="isOpenDelete = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DialogDelete from "src/components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "src/components/Buttons/ButtonTooltip.vue";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

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
    name: "imagen",
    align: "left",
    label: "Imagen",
    field: "imagen",
    sortable: true,
  },
  {
    name: "resumen",
    align: "left",
    label: "Resumen",
    field: "resumen",
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
const servicios = ref([]);
const deleteServiciosId = ref([]);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getServicios();
});

const checkDelete = (row) => {
  deleteServiciosId.value = row;
  isOpenDelete.value = true;
};

const getServicios = () => {
  isLoading.value = true;
  api
    .get("/api/servicios")
    .then((response) => {
      isLoading.value = false;
      servicios.value = response.data.servicios;
    })
    .catch((error) => handleErrors(error));
};

const deleteServicio = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/servicios/" + deleteServiciosId.value.id)
    .then((response) => {
      isLoadingDelete.value = false;
      successNotifyConfig(response.data.message);
      isOpenDelete.value = false;
      getServicios();
    })
    .catch((error) => {
      handleErrors(error);
      isOpenDelete.value = false;
    });
};
</script>

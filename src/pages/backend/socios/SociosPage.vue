<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Socios"
      :rows="socios"
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
          @click="$router.push({ path: '/crear-socio' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-logo="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img
              :src="props.row.logo"
              style="height: 50px; max-width: 195px"
            />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-web="props">
        <q-td :props="props">
          <a
            target="_blank"
            :href="props.row.web"
            class="hover:tw-underline hover:tw-text-blue"
            >{{ props.row.web }}</a
          >
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
                  path: '/editar-socio/' + props.row.id,
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
      @delete="deleteSocio"
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
  { name: "logo", align: "left", label: "Logo", field: "logo", sortable: true },
  {
    name: "web",
    align: "left",
    label: "Dirección URL",
    field: "web",
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
const socios = ref([]);
const deleteSociosId = ref([]);

const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getSocios();
});

const checkDelete = (row) => {
  deleteSociosId.value = row;
  isOpenDelete.value = true;
};

const getSocios = () => {
  isLoading.value = true;
  api
    .get("/api/socios")
    .then((response) => {
      isLoading.value = false;
      socios.value = response.data.socios;
    })
    .catch((error) => handleErrors(error));
};

const deleteSocio = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/socios/" + deleteSociosId.value.id)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
      getSocios();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
    });
};
</script>

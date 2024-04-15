<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Preguntas Frecuentes"
      :rows="faqs"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-pregunta="props">
        <td>
          <div class="tw-w-44 ellipsis">{{ props.row.pregunta }}</div>
        </td>
      </template>
      <template v-slot:body-cell-respuesta="props">
        <td>
          <div class="tw-w-60 ellipsis">{{ props.row.respuesta }}</div>
        </td>
      </template>

      <template v-slot:top-right>
        <q-btn
          class="bg-primary text-white"
          @click="$router.push({ path: '/add-pregunta' })"
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
                  path: '/editar-pregunta/' + props.row.id,
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
      @delete="deleteFaq"
      @closeDialog="isOpenDelete = false"
      :is-delete-loading="isDeleteLoading"
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
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { handleErrors } = handleHttpRequest();

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "pregunta",
    align: "left",
    label: "Pregunta",
    field: "pregunta",
    sortable: true,
  },
  {
    name: "respuesta",
    align: "left",
    label: "Respuesta",
    field: "respuesta",
    sortable: true,
  },
  {
    name: "created_at",
    align: "left",
    label: "Fecha Creación",
    field: "created_at",
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
const faqs = ref([]);
const deleteFaqId = ref([]);
const isDeleteLoading = ref(false);

onMounted(() => {
  getFaq();
});

const checkDelete = (row) => {
  deleteFaqId.value = row;
  isOpenDelete.value = true;
};

const getFaq = async () => {
  isLoading.value = true;
  await api
    .get("/api/faqs")
    .then((response) => {
      isLoading.value = false;
      faqs.value = response.data.faqs;
    })
    .catch((error) => handleErrors(error));
};

const deleteFaq = () => {
  isDeleteLoading.value = true;
  api
    .delete("/api/faqs/" + deleteFaqId.value.id + "/")
    .then((response) => {
      successNotifyConfig(response.data.message);
      isDeleteLoading.value = false;
      isOpenDelete.value = false;
      getFaq();
    })
    .catch((error) => {
      isDeleteLoading.value = false;
      handleErrors(error);
    });
};
</script>

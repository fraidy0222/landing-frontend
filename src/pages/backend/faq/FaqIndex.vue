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
      <template v-slot:body-cell-created_at="props">
        <td>
          <div>{{ formatDate(props.row.created_at) }}</div>
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
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "components/Buttons/ButtonTooltip.vue";
import dayjs from "dayjs";
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
const $q = useQuasar();
const isDeleteLoading = ref(false);

onMounted(() => {
  getFaq();
});

function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD - HH:mm");
}

const checkDelete = (row) => {
  deleteFaqId.value = row;
  isOpenDelete.value = true;
};

const getFaq = async () => {
  isLoading.value = true;
  await api.get("/api/faqs").then((response) => {
    isLoading.value = false;
    faqs.value = response.data.faqs;
  });
};

const deleteFaq = () => {
  isDeleteLoading.value = true;
  api
    .delete("/api/faqs/" + deleteFaqId.value.id + "/")
    .then((response) => {
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });
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

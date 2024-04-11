<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Enlaces"
      :rows="enlaces"
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
          @click="$router.push({ path: '/crear-enlaces-interes' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-creada_por_info="props">
        <td>
          <div>{{ props.row.categorias.nombre }}</div>
        </td>
      </template>
      <template v-slot:body-cell-enlace="props">
        <q-td :props="props">
          <a
            target="_blank"
            :href="props.row.enlace"
            class="hover:tw-underline hover:tw-text-blue"
            >{{ props.row.enlace }}</a
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
                  path: '/editar-enlaces-interes/' + props.row.id,
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
      @delete="deleteEnlacesInteres"
      @closeDialog="isOpenDelete = false"
      :is-delete-loading="isDeleteDialog"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { onMounted } from "vue";
import useTable from "src/composables/useTable";
import DeleteDialog from "src/components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "components/Buttons/ButtonTooltip.vue";

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
    name: "enlace",
    align: "left",
    label: "Enlace",
    field: "enlace",
    sortable: true,
  },
  {
    name: "categorias",
    align: "left",
    label: "Categoría",
    field: "categorias",
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
const enlaces = ref([]);
const deleteEnlacesInteresId = ref([]);
const $q = useQuasar();
const isDeleteDialog = ref(false);

onMounted(() => {
  getEnlacesInteres();
});

const checkDelete = (row) => {
  deleteEnlacesInteresId.value = row;
  isOpenDelete.value = true;
};

const getEnlacesInteres = () => {
  isLoading.value = true;
  api.get(`/api/enlaces/`).then((response) => {
    isLoading.value = false;
    enlaces.value = response.data.enlaces;
  });
};

const deleteEnlacesInteres = () => {
  isDeleteDialog.value = true;
  api
    .delete("/api/enlaces/" + deleteEnlacesInteresId.value.id)
    .then((response) => {
      isDeleteDialog.value = false;
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });
      isOpenDelete.value = false;
      getEnlacesInteres();
    })
    .catch((error) => {
      if (error.response.status === 404) {
        $q.notify({
          type: "negative",
          message:
            "Enlace no encontrado en la Base de Datos. Contacte con el Administrador del sistema.",
          position: "top-right",
          progress: true,
        });
      } else {
        $q.notify({
          type: "negative",
          message: error.message,
          position: "top-right",
          progress: true,
        });
      }
      isDeleteDialog.value = false;
      isOpenDelete.value = false;
    });
};
</script>

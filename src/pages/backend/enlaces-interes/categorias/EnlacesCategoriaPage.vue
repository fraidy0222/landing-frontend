<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Categorías de Enlace"
      :rows="categorias"
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
          @click="$router.push({ path: '/crear-enlaces-categorias' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'opciones'">
              <button-tooltip
                icon="edit"
                tooltip="Editar"
                color="warning"
                :flat="true"
                :round="true"
                @click="
                  $router.push({
                    path: '/editar-enlaces-categorias/' + props.row.id,
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
            <div
              class="ellipsis tw-w-44"
              v-else-if="col.name === 'descripcion'"
            >
              {{ col.value }}
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-table
              flat
              bordered
              title="Enlaces"
              :rows="props.row.enlaces"
              :columns="columnsEnlaces"
              row-key="id"
              :pagination-label="getPaginationLabel"
              :loading-label="textInfo.loadingLabel"
              :rows-per-page-label="textInfo.rowPerPageLabel"
              :no-data-label="textInfo.noDatalabel"
              :loading="isLoading"
            >
              <template v-slot:body-cell-enlace="props">
                <q-td :props="props">
                  <a
                    target="_blank"
                    :href="props.row.enlace"
                    class="hover:tw-underline hover:tw-text-blue-500"
                    >{{ props.row.enlace }}</a
                  >
                </q-td>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <DeleteDialog
      :is-open="isOpenDelete"
      @delete="deleteEnlacesCategorias"
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
import DeleteDialog from "src/components/Dialogs/DialogDelete.vue";
import ButtonTooltip from "src/components/Buttons/ButtonTooltip.vue";
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
    name: "descripcion",
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
const columnsEnlaces = [
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
];

const isLoading = ref(false);
const isOpenDelete = ref(false);
const isDeleteLoading = ref(false);
const categorias = ref([]);
const deleteEnlacesCategoriaId = ref([]);
const $q = useQuasar();

onMounted(() => {
  getEnlacesCategorias();
});

const checkDelete = (row) => {
  deleteEnlacesCategoriaId.value = row;
  isOpenDelete.value = true;
};

const getEnlacesCategorias = () => {
  isLoading.value = true;
  api.get(`/api/categorylink/`).then((response) => {
    isLoading.value = false;
    categorias.value = response.data.categorias;
  });
};

const deleteEnlacesCategorias = () => {
  isDeleteLoading.value = true;
  api
    .delete("/api/categorylink/" + deleteEnlacesCategoriaId.value.id + "/")
    .then((response) => {
      isDeleteLoading.value = false;
      $q.notify({
        type: "positive",
        message: response.data.message,
        position: "top-right",
        progress: true,
      });
      isOpenDelete.value = false;
      getEnlacesCategorias();
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
        (isOpenDelete.value = false),
        (isDeleteLoading.value = false)
      );
    });
};
</script>

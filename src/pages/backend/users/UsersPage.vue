<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Usuarios"
      :rows="users"
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
          @click="$router.push({ path: '/crear-usuario' })"
        >
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-is_active="props">
        <q-td :props="props">
          <div v-if="props.row.is_active">
            <q-icon color="positive" name="task_alt" size="25px"></q-icon>
          </div>
          <div v-else>
            <q-icon color="negative" name="cancel" size="25px"></q-icon>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          <div>
            {{ props.row.role[0] }}
          </div>
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
                  path: '/editar-usuario/' + props.row.id,
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
      @delete="deleteUser"
      @closeDialog="isOpenDelete = false"
      :is-delete-loading="isLoadingDelete"
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
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const { getPaginationLabel, textInfo } = useTable();

const columns = [
  {
    name: "name",
    align: "left",
    label: "Nombre",
    field: "name",
    sortable: true,
  },
  {
    name: "username",
    align: "left",
    label: "Nombre de Usuario",
    field: "username",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Correo",
    field: "email",
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Rol",
    field: "role",
    sortable: true,
  },
  {
    name: "is_active",
    align: "center",
    label: "Estado",
    field: "is_active",
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
const users = ref([]);
const deleteUserId = ref([]);
const { handleErrors } = handleHttpRequest();

onMounted(() => {
  getUsers();
});

const checkDelete = (row) => {
  deleteUserId.value = row;
  isOpenDelete.value = true;
};

const getUsers = () => {
  isLoading.value = true;
  api.get("/api/users").then((response) => {
    isLoading.value = false;
    users.value = response.data.users;
  });
};

const deleteUser = () => {
  isLoadingDelete.value = true;
  api
    .delete("/api/users/" + deleteUserId.value.id)
    .then((response) => {
      isLoadingDelete.value = false;
      successNotifyConfig(response.data.message);
      isOpenDelete.value = false;
      getUsers();
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingDelete.value = false;
      isOpenDelete.value = false;
    });
};
</script>

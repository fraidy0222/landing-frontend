<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Servicio </q-card-section>
      <q-card-section>
        <q-form @submit="storeServicio">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.resumen"
                label="Resumen"
                type="text"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-file
                name="logo"
                outlined
                v-model="form.imagen"
                label="Imagen"
                clearable
                accept="image/*"
                max-files="1"
                counter
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/servicios' })"
            type="button"
            color="negative"
            class="text-white q-mr-sm"
          >
            <q-icon name="arrow_circle_left" class="q-mr-sm"></q-icon>
            Volver
          </q-btn>
          <q-btn
            type="submit"
            color="primary"
            class="text-white"
            :loading="isLoading"
            :disable="isLoading"
          >
            <q-icon name="save" class="q-mr-sm"></q-icon>
            Guardar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const router = useRouter();
const isLoading = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  nombre: "",
  imagen: null,
  resumen: "",
});

const storeServicio = () => {
  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    const value = form.value[key];
    if (value !== null && value !== undefined) {
      if (key === "imagen") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  isLoading.value = true;
  api
    .post("/api/servicios", formData)
    .then((response) => {
      isLoading.value = false;
      successNotifyConfig(response.data.message);
      router.push({ path: "/servicios" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Agregar Socio </q-card-section>
      <q-card-section>
        <q-form @submit="storeSocios">
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
                v-model="form.web"
                label="Dirección web"
                type="url"
                :rules="[rules.validUrlNotRequired]"
                hint="https://ejemplo.cu"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-file
                name="logo"
                outlined
                v-model="form.logo"
                label="Logo"
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
            @click="$router.push({ path: '/socios' })"
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
  logo: null,
  web: "",
});

const storeSocios = () => {
  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    const value = form.value[key];
    if (value !== null && value !== undefined) {
      if (key === "logo") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  isLoading.value = true;
  api
    .post("/api/socios", formData)
    .then((response) => {
      isLoading.value = false;
      successNotifyConfig(response.data.message);
      router.push({ path: "/socios" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

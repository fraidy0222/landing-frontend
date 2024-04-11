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
                type="text"
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
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";

const $q = useQuasar();
const router = useRouter();
const isLoading = ref(false);

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

  console.log(form.value);

  api
    .post("/api/socios", formData)
    .then((response) => {
      isLoading.value = false;
      $q.notify({
        type: "positive",
        message: "Socio creado correctamente.",
        position: "top-right",
        progress: true,
      });

      router.push({ path: "/socios" });
    })
    .catch((error) => {
      if (error.response.data) {
        for (let field in error.response.data.errors) {
          if (Array.isArray(error.response.data.errors[field])) {
            error.response.data.errors[field].forEach((errorMessage) => {
              $q.notify({
                type: "negative",
                message: errorMessage,
                position: "top-right",
                progress: true,
              });
            });
          } else {
            $q.notify({
              type: "negative",
              message: error.response.data.errors[field],
              position: "top-right",
              progress: true,
            });
          }
        }
        isLoading.value = false;
      }
    });
};
</script>

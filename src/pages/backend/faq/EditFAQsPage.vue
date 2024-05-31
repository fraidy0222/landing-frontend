<template>
  <div
    v-if="isLoadingFaq"
    class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center tw-h-screen"
  >
    <div>
      <q-spinner-cube color="primary" size="4em" />
    </div>
    <div class="tw-text-lg">Cargando. Por favor espere...</div>
  </div>

  <div v-else class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Pregunta Frecuente
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateFaq">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.pregunta"
                label="Pregunta"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.respuesta"
                label="Respuesta"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({ path: '/preguntas-frecuentes' })"
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
            Editar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import rules from "src/utils/rules";
import { successNotifyConfig } from "src/utils/notification/notification";
import handleHttpRequest from "src/composables/handleHttpRequest";

const router = useRouter();
const faq_id = router.currentRoute.value.params.id;
const isLoading = ref(false);
const isLoadingFaq = ref(false);

const { handleErrors } = handleHttpRequest();

const form = ref({
  pregunta: "",
  respuesta: "",
});

onMounted(() => {
  getFaq();
});

const getFaq = () => {
  isLoadingFaq.value = true;
  api
    .get(`/api/faqs/` + faq_id)
    .then((response) => {
      isLoadingFaq.value = false;
      form.value = response.data;
    })
    .catch((error) => {
      handleErrors(error);
      isLoadingFaq.value = false;
    });
};

const updateFaq = () => {
  isLoading.value = true;
  api
    .put("/api/faqs/" + faq_id + "/", form.value)
    .then((response) => {
      successNotifyConfig(response.data.message);
      isLoading.value = false;
      router.push({ path: "/preguntas-frecuentes" });
    })
    .catch((error) => {
      handleErrors(error);
      isLoading.value = false;
    });
};
</script>

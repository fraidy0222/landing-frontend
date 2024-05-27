<template>
  <div class="tw-mt-5">
    <q-card>
      <q-card-section class="row tw-justify-between">
        <div class="text-h6">{{ props.title }}</div>
        <div class="tw-flex tw-items-center tw-gap-x-3">
          <q-btn
            :loading="isUploadLoading"
            v-show="!props.empresa[0]?.video_institucional"
            icon="upload"
            @click="uploadVideo"
            color="primary"
            label="Subir"
            outline
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              {{ progress }}%
            </template>
          </q-btn>
          <q-btn
            v-show="props.empresa[0]?.video_institucional"
            icon="delete"
            @click="isOpenDeleteVideo = true"
            color="negative"
            label="Eliminar"
            outline
          ></q-btn>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <div class="tw-mb-4">
          <q-file
            name="Video"
            outlined
            v-model="video_institucional"
            label="Video"
            clearable
            accept="video/*"
            max-files="1"
            counter
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>

        <div v-if="props.empresa[0]?.video_institucional">
          <!-- <VideoComponent :empresa="props.empresa" /> -->
          <slot name="video"></slot>
        </div>
        <div v-else>
          <div
            class="tw-flex tw-text-gray500 tw-items-center tw-justify-center tw-text-lg tw-leading-6"
          >
            {{ props.notFound }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- Delete Video Dialog -->
  <DialogDelete
    :is-open="isOpenDeleteVideo"
    :is-delete-loading="isLoadingDeleteVideo"
    @closeDialog="isOpenDeleteVideo = false"
    @delete="deleteVideo"
    body-label="¿Estás seguro de eliminar este video?"
  />
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";
import handleHttpRequest from "src/composables/handleHttpRequest";
import {
  errorNotifyConfig,
  successNotifyConfig,
} from "src/utils/notification/notification";
import DialogDelete from "components/Dialogs/DialogDelete.vue";
// import VideoComponent from "components/Video/VideoComponent.vue";

const video_institucional = ref(null);
const progress = ref(0);
const progressLabel = ref("");
const isUploadLoading = ref(false);
const isOpenDeleteVideo = ref(false);
const isLoadingDeleteVideo = ref(false);

const { handleErrors } = handleHttpRequest();

const props = defineProps({
  title: {
    type: String,
    default: "Video Institucional",
  },
  empresa: {
    type: Array,
    requeired: true,
  },
  notFound: {
    type: String,
    default: "No existe video",
  },
  getEmpresa: Function,
});

const uploadVideo = () => {
  let formData = new FormData();

  formData.append("video_institucional", video_institucional.value);

  // Verifica si se seleccionó un archivo de video
  if (!video_institucional.value) {
    errorNotifyConfig("Por favor, selecciona un video");
    return; // Detiene la ejecución si no se seleccionó ningún archivo
  }

  // Verifica si el archivo es mayor a 2 GB (2 * 1024 * 1024 * 1024 bytes)
  if (video_institucional.value.size > 2 * 1024 * 1024 * 1024) {
    errorNotifyConfig("El video no puede ser mayor a 2 GB");
    return; // Detiene la ejecución si el archivo es demasiado grande
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      _method: "PUT",
    },
    onUploadProgress: (progressEvent) => {
      // Calcula el progreso en porcentaje
      const progressValue = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );

      // Actualiza el estado de la barra de progreso
      progress.value = progressValue;
      progressLabel.value = progressValue + "%";
    },
  };

  isUploadLoading.value = true;
  api
    .post("/api/upload/" + props.empresa[0].id, formData, config)
    .then((response) => {
      successNotifyConfig(response.data.message);

      video_institucional.value = null;
      progress.value = 0;
      isUploadLoading.value = false;

      props.getEmpresa();
    })
    .catch((error) => {
      errorNotifyConfig(error.response.data.error);
      isUploadLoading.value = false;
      video_institucional.value = null;
      progress.value = 0;
    });
};

const deleteVideo = async () => {
  isLoadingDeleteVideo.value = true;
  await api
    .delete(
      "/api/deleteVideo/" + props.empresa[0].id,
      props.empresa[0].video_institucional
    )
    .then((response) => {
      successNotifyConfig(response.data.message);
      props.getEmpresa();
      isLoadingDeleteVideo.value = false;
      isOpenDeleteVideo.value = false;
      isUploadLoading.value = false;
      video_institucional.value = null;
      progress.value = 0;
    })
    .catch((error) => {
      handleErrors(error);
      isOpenDeleteVideo.value = false;
      isLoadingDeleteVideo.value = false;
    });
};
</script>

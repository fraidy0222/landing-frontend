<template>
  <div class="tw-w-full">
    <q-video
      ref="videoPlayer"
      :src="videoUrl"
      :ratio="16 / 9"
      loading="lazy"
      :autoplay="false"
    ></q-video>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { onMounted } from "vue";

const videoUrl = ref(null);
const videoPlayer = ref(null);

const props = defineProps({
  empresa: {
    type: Object,
  },
});

onMounted(() => {
  video();
});

const video = () => {
  api
    .get(`api/z/${props.empresa[0].id}`, {
      responseType: "blob",
      headers: {
        Range: "bytes=0-",
      },
    })
    .then((response) => {
      console.log(response.data);
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      videoUrl.value = URL.createObjectURL(videoBlob);
      videoPlayer.value.src = videoUrl.value;
    })
    .catch((error) => {
      console.error("Error al cargar el video:", error);
    });
};
</script>

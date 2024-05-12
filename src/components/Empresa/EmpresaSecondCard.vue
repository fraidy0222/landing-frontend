<template>
  <q-card>
    <q-card-section class="row tw-justify-between">
      <div class="text-h6">{{ title }}</div>
      <div>
        <q-btn
          v-if="!props.hasValue"
          outline
          color="primary"
          icon="add"
          @click="emit('click')"
          >Crear</q-btn
        >
        <q-btn v-else outline color="primary" icon="edit" @click="emit('click')"
          >Editar</q-btn
        >
      </div>
    </q-card-section>

    <q-separator />
    <div
      v-if="!props.hasValue"
      class="tw-flex tw-py-5 tw-text-gray500 tw-items-center tw-justify-center tw-text-lg tw-leading-6"
    >
      No existe datos
    </div>
    <div v-else>
      <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
        <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Director
        </dt>
        <dd
          class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
        >
          {{ empresa[0]?.director }}
        </dd>
      </div>
      <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
        <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Slogan
        </dt>
        <dd
          class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
        >
          {{ empresa[0]?.slogan }}
        </dd>
      </div>
      <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
        <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Resumen
        </dt>
        <dd
          class="tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0 tw-break-words"
        >
          {{ empresa[0]?.resumen }}
        </dd>
      </div>
      <div class="tw-px-4 tw-py-4 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
        <dt class="tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
          Redes Sociales
        </dt>
        <dd
          class="tw-flex tw-items-center tw-gap-4 tw-mt-1 tw-text-sm tw-leading-6 tw-text-gray-700 sm:tw-col-span-2 sm:tw-mt-0"
        >
          <a
            target="_blank"
            v-if="empresa[0]?.facebook"
            :href="empresa[0]?.facebook"
          >
            <q-icon name="facebook" color="primary" size="30px"></q-icon>
          </a>
          <a
            target="_blank"
            v-if="empresa[0]?.youtube"
            :href="empresa[0]?.youtube"
          >
            <q-icon name="mdi-youtube" color="negative" size="33px"></q-icon>
          </a>
          <a
            target="_blank"
            v-if="empresa[0]?.twitter"
            :href="empresa[0]?.twitter"
          >
            <q-icon name="mdi-twitter" color="primary" size="30px"></q-icon>
          </a>
          <a
            target="_blank"
            v-if="empresa[0]?.linkedin"
            :href="empresa[0]?.linkedin"
          >
            <q-icon name="mdi-linkedin" color="primary" size="30px"></q-icon>
          </a>
        </dd>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  empresa: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "Información de la Empresa",
  },
  hasValue: Boolean,
});

const emit = defineEmits(["click", "uploadVideo"]);
</script>

<template>
  <div class="tw-flex tw-justify-center tw-h-screen tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center">
      <img src="src/assets/empty.svg" alt="" class="tw-h-auto tw-w-[300px]" />
      <div class="tw-text-2xl tw-font-medium tw-leading-6">
        {{ props.title }}
      </div>
      <div
        class="tw-text-sm tw-font-medium tw-text-gray500 tw-py-3.5 tw-text-center tw-w-[290px]"
      >
        {{ props.body }}
      </div>
      <div>
        <q-btn
          @click="emit('click')"
          icon="add"
          label="Crear empresa"
          color="primary"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  title: {
    type: String,
    default: " No existe la empresa",
  },
  body: {
    type: String,
    default: " Para crear una empresa de un click en el botón CREAR EMPRESA",
  },
});
</script>

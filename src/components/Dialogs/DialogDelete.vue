<template>
  <q-dialog v-model="openModel" :persistent="props.isPersistDialog">
    <q-card :style="props.styleCard">
      <q-card-section>
        <div class="row justify-center q-mb-md">
          <q-icon name="warning_amber" size="lg" color="negative" />
        </div>
        <div class="text-center text-weight-bold">{{ props.bodyLabel }}</div>
        <div class="row items-center justify-center q-mt-md">
          <q-btn
            class="q-mr-sm"
            outline
            label="Cancelar"
            color="bg-black"
            @click="$emit('closeDialog')"
          />
          <q-btn
            @click="$emit('delete')"
            color="negative"
            label="Borrar"
            :loading="isDeleteLoading"
            :disable="isDeleteLoading"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Eliminar Registro",
  },
  styleCard: {
    type: String,
    default: "width: 350px; max-width: 60vw;",
  },
  isIconClose: {
    type: Boolean,
    default: true,
  },
  isPersistDialog: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: "",
  },
  bodyLabel: {
    type: String,
    default: "Este registro se eliminará de forma permanente",
  },
  isDeleteLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["delete", "closeDialog"]);

const openModel = computed({
  // getter
  get() {
    return props.isOpen;
  },
  // setter
  set(newValue) {
    [props.isOpen] = newValue;
  },
});
</script>
